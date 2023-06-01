import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import type { Block, LastSync, Transaction, WriteableBlockchainDB } from './types';
import type { EIP1193BlockWithTransactions } from 'eip-1193';

export function setupDB(): WriteableBlockchainDB {
	function addBlocksTableIfNotExists(db: Database.Database) {
		db.prepare(
			`
            CREATE TABLE IF NOT EXISTS blocks (
                number INTEGER PRIMARY KEY,
                hash TEXT NOT NULL
            ) STRICT;
        `
		).run();
		db.prepare(
			`
            CREATE TABLE IF NOT EXISTS transactions (
                hash TEXT PRIMARY KEY,
                block_number INTEGER NOT NULL
            ) STRICT;
        `
		).run();
		db.prepare(
			`
            CREATE TABLE IF NOT EXISTS addresses (
                address TEXT PRIMARY KEY
            ) STRICT;
        `
		).run();
	}

	function getBlocks(limit = 50): Block[] {
		const stmnt = db.prepare(`SELECT number, hash FROM blocks LIMIT $limit`);
		const rows = stmnt.all({ limit });
		return rows as Block[];
	}

	function getTransactions(limit = 50): Transaction[] {
		const stmnt = db.prepare(`SELECT hash, block_number FROM transactions LIMIT $limit`);
		const rows = stmnt.all({ limit });
		console.log({ rows });
		return rows as Transaction[];
	}

	function getLastSync(): LastSync | undefined {
		const stmnt = db.prepare(`SELECT number, hash FROM blocks ORDER BY number DESC LIMIT 1`);
		const rows = stmnt.all();
		const block = rows[0] as Block | undefined;
		if (block) {
			return { block };
		}
		return undefined;
	}

	function addEIP1193Block(block: EIP1193BlockWithTransactions) {
		const insert_block = db.prepare(`INSERT INTO blocks (number, hash) VALUES ($number, $hash)`);
		const insert_transaction = db.prepare(
			`INSERT INTO transactions (hash, block_number) VALUES ($hash, $block_number)`
		);

		const executeTransaction = db.transaction((block: EIP1193BlockWithTransactions) => {
			const blockNumber = parseInt(block.number.slice(2), 16);
			insert_block.run({ number: blockNumber, hash: block.hash });
			for (const tx of block.transactions) {
				insert_transaction.run({
					hash: tx.hash,
					block_number: blockNumber
				});
			}
		});
		executeTransaction(block);
	}

	const db = new Database(DB_PATH, { verbose: console.log });
	addBlocksTableIfNotExists(db);
	try {
		// createBlock(1, '0xff');
	} catch {}

	return {
		getBlocks,
		getTransactions,
		getLastSync,
		addEIP1193Block
	};
}
