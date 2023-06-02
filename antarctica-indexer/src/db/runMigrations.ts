import {Migrator, FileMigrationProvider} from 'kysely';
import {promises as fs} from 'fs';
import path from 'path';
import {db} from '.';

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs,
		path,
		migrationFolder: path.join(__dirname, 'migrations'),
	}),
});

migrator.migrateToLatest();
