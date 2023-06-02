import {Kysely} from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('addresses')
		.addColumn('address', 'text', (col) => col.primaryKey())
		.execute();

	console.log(`addresses table created!`);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('addresses').execute();
	console.log(`addresses table droped!`);
}
