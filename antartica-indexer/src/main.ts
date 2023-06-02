import Koa from 'koa';
import {createYoga} from 'graphql-yoga';

import {schema} from './schema';
import {Context} from './builder';
import {db} from './db';

const app = new Koa();

const graphQLServer = createYoga<Koa.ParameterizedContext>({
	schema,
	context: (): Context => ({db}),
});

app.use(async (ctx) => {
	const response = await graphQLServer.handleNodeRequest(ctx.req, ctx);
	ctx.status = response.status;
	response.headers.forEach((value, key) => {
		ctx.append(key, value);
	});
	ctx.body = response.body;
});

app.listen(4000, () => {
	console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
