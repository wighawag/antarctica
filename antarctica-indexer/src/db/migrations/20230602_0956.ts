import {Kysely} from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('blocks')
		.addColumn('hash', 'text', (col) => col.primaryKey())
		.addColumn('number', 'integer')
		.execute();

	console.log(`blocks table created!`);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('blocks').execute();
	console.log(`blocks table droped!`);
}
