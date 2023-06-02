import {Kysely, SqliteDialect, Generated} from 'kysely';
import SQLite from 'better-sqlite3';

interface BlockTable {
	hash: string;
	number: number;
}

interface Database {
	blocks: BlockTable;
}

export const db = new Kysely<Database>({
	dialect: new SqliteDialect({
		database: new SQLite('dev.db'),
	}),
});
