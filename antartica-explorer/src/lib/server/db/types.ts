import type { EIP1193BlockWithTransactions } from 'eip-1193';

export type Block = {
	number: number;
	hash: `0x${string}`;
};

export type Transaction = {
	hash: `0x${string}`;
	block_number: number;
};

export type LastSync = {
	block: Block;
};

export type BlockchainDB = {
	getBlocks(limit?: number): Block[];
	getTransactions(limit?: number): Transaction[];
	getLastSync(): LastSync | undefined;
};

export type WriteableBlockchainDB = BlockchainDB & {
	addEIP1193Block(block: EIP1193BlockWithTransactions): void;
};
