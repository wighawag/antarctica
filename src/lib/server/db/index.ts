import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import type { Block } from './types';

function setupDB() {
	function addBlocksTableIfNotExists(db: Database.Database) {
		const sql = `
        create table if not exists blocks (
        number integer primary key,
        hash text not null
        ) strict;
        `;
		const stmnt = db.prepare(sql);
		stmnt.run();
	}

	function getBlocks(limit = 50): Block[] {
		const sql = `select number ,hash from blocks limit $limit`;
		const stmnt = db.prepare(sql);
		const rows = stmnt.all({ limit });
		return rows as Block[];
	}

	async function createBlock(num: number, hash: `0x${string}`): Promise<void> {
		const sql = `insert into blocks (number, hash) values ($num, $hash)`;
		const stmnt = db.prepare(sql);
		stmnt.run({ num, hash });
	}

	const db = new Database(DB_PATH, { verbose: console.log });
	addBlocksTableIfNotExists(db);
	try {
		createBlock(1, '0xff');
	} catch {}

	return {
		getBlocks,
		createBlock
	};
}

export const db = setupDB();
