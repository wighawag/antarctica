import {Kysely, SqliteDialect, Generated} from 'kysely';
import SQLite from 'better-sqlite3';

interface BlockTable {
	hash: string;
	number: number;
}

interface ExplorerDatabase {
	blocks: BlockTable;
}

export type Database = Kysely<ExplorerDatabase>;

export const db = new Kysely<ExplorerDatabase>({
	dialect: new SqliteDialect({
		database: new SQLite('dev.db'),
	}),
});
