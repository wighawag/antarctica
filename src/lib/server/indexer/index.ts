import type { EIP1193ProviderWithoutEvents } from 'eip-1193';
import type { WriteableBlockchainDB } from '../db/types';

export function initIndexer(db: WriteableBlockchainDB, provider: EIP1193ProviderWithoutEvents) {
	async function sync() {
		const latestBlockNumberAsHex = await provider.request({
			method: 'eth_blockNumber'
		});
		const latestBlockNumber = parseInt(latestBlockNumberAsHex.slice(2), 16);

		const lastSync = db.getLastSync();
		if (!lastSync || lastSync.block.number < latestBlockNumber) {
			const start = (lastSync?.block.number || -1) + 1;
			for (let blockNumber = start; blockNumber <= latestBlockNumber; blockNumber++) {
				const blockNumberAsHex = `0x${blockNumber.toString(16)}` as `0x${string}`;
				const block = await provider.request({
					method: 'eth_getBlockByNumber',
					params: [blockNumberAsHex, true]
				});
				if (block) {
					db.addEIP1193Block(block);
				} else {
					console.error(`failed to fetch block, we abort the sync`);
					break;
				}
			}
		}
	}

	return {
		sync
	};
}
