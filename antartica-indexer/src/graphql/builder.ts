import SchemaBuilder from '@pothos/core';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';

import {db} from '../db';

interface Root<T> {
	Context: T;
}

export interface Context {
	db: typeof db;
}

const builder = new SchemaBuilder<Root<Context>>({
	plugins: [SimpleObjectsPlugin],
});

builder.queryType({});
builder.mutationType({});

export {builder};
