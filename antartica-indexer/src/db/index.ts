import {Kysely, SqliteDialect} from 'kysely';
import SQLite from 'better-sqlite3';

interface BlockTable {
	hash: string;
	number: number;
}

interface TransactionTable {
	hash: string;
	from: string;
	to: string | null;
}

interface AddressTable {
	address: string;
}

interface ExplorerDatabase {
	blocks: BlockTable;
	transactions: TransactionTable;
	addresses: AddressTable;
}

export type Database = Kysely<ExplorerDatabase>;

export const db = new Kysely<ExplorerDatabase>({
	dialect: new SqliteDialect({
		database: new SQLite('dev.db'),
	}),
});
