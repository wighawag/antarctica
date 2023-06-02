import path from 'path';
import fs from 'fs';

import {printSchema, lexicographicSortSchema} from 'graphql';

import {builder} from '../builder';

import './resolvers';

export const schema = builder.toSchema({});

const schemaAsString = printSchema(lexicographicSortSchema(schema));
fs.writeFileSync(path.join(process.cwd(), './src/schema/schema.gql'), schemaAsString);
