import {Kysely} from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('transactions')
		.addColumn('hash', 'text', (col) => col.primaryKey())
		.addColumn('from', 'text')
		.addColumn('to', 'text')
		.execute();

	console.log(`transactions table created!`);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('transactions').execute();
	console.log(`transactions table droped!`);
}
