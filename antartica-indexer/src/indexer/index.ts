import type {
	EIP1193ProviderExtraMethods,
	EIP1193ProviderWithoutEvents,
	EIP1193QUANTITY,
	EIP1193TracedTransaction,
} from 'eip-1193';
import {Database} from '../db';

export function initIndexer(db: Database, provider: EIP1193ProviderWithoutEvents & EIP1193ProviderExtraMethods) {
	async function sync() {
		const latestBlockNumberAsHex = await provider.request({
			method: 'eth_blockNumber',
		});
		const latestBlockNumber = parseInt(latestBlockNumberAsHex.slice(2), 16);

		const lastSync = await db
			.selectFrom('blocks')
			.select(['hash', 'number'])
			.orderBy('blocks.number', 'desc')
			.limit(1)
			.executeTakeFirst();

		if (!lastSync || lastSync.number < latestBlockNumber) {
			console.log(`${lastSync?.number || 0} < ${latestBlockNumber}`);

			const start = (lastSync?.number || -1) + 1;
			for (let blockNumber = start; blockNumber <= latestBlockNumber; blockNumber++) {
				const blockNumberAsHex = `0x${blockNumber.toString(16)}` as `0x${string}`;
				const block = await provider.request({
					method: 'eth_getBlockByNumber',
					params: [blockNumberAsHex, true],
				});
				// TODO debug_traceBlockByHash
				// const traced_block = await (provider as any).request({
				// 	method: 'debug_traceBlockByHash',
				// 	params: [block.hash],
				// });
				// console.log(traced_block);
				if (block) {
					const transactions = block.transactions;
					if (transactions.length > 0) {
						const tracedTransactions: EIP1193TracedTransaction[] = [];
						for (const transaction of block.transactions) {
							// eip-1193: debug_traceTransaction
							try {
								const tracedTransaction = await provider.request({
									method: 'debug_traceTransaction',
									params: [transaction.hash],
								});

								tracedTransactions.push(tracedTransaction);
							} catch {
								console.error(`could not trace tx ${transaction.hash}`);
							}
						}

						// console.log(`executing transaction...`);
						await db.transaction().execute(async (trx) => {
							await trx
								.insertInto('transactions')
								.values(
									transactions.map((v) => ({
										hash: v.hash,
										from: v.from,
										to: v.to,
									}))
								)
								.execute();

							await trx
								.insertInto('blocks')
								.values({
									hash: block.hash,
									number: blockNumber,
								})
								.execute();
						});
						// console.log(`executing transaction...`);
					} else {
						// console.log(`empty block ${blockNumber}`);
						await db
							.insertInto('blocks')
							.values({
								hash: block.hash,
								number: blockNumber,
							})
							.execute();
					}
				} else {
					console.error(`failed to fetch block, we abort the sync`);
					break;
				}
			}
		} else {
			console.log(`${lastSync.number} >= ${latestBlockNumber}`);
		}
	}

	return {
		sync,
	};
}
