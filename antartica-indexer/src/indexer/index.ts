import type {EIP1193ProviderWithoutEvents} from 'eip-1193';
import {Database} from '../db';

export function initIndexer(db: Database, provider: EIP1193ProviderWithoutEvents) {
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
		console.log('lastSync', lastSync);
		console.log({
			latestBlockNumber,
		});
		if (!lastSync || lastSync.number < latestBlockNumber) {
			const start = (lastSync?.number || -1) + 1;
			console.log({
				start,
			});
			for (let blockNumber = start; blockNumber <= latestBlockNumber; blockNumber++) {
				const blockNumberAsHex = `0x${blockNumber.toString(16)}` as `0x${string}`;
				const block = await provider.request({
					method: 'eth_getBlockByNumber',
					params: [blockNumberAsHex, true],
				});
				console.log({
					blockNumberAsHex,
					hash: block.hash,
				});
				if (block) {
					await db
						.insertInto('blocks')
						.values({
							hash: block.hash,
							number: parseInt(block.number.slice(2), 16),
						})
						.execute();
				} else {
					console.error(`failed to fetch block, we abort the sync`);
					break;
				}
			}
		}
	}

	return {
		sync,
	};
}
