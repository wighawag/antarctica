import Koa from 'koa';
import {createYoga} from 'graphql-yoga';

import {schema} from './graphql';
import {Context} from './graphql/builder';
import {db} from './db';

import {initIndexer} from './indexer';
import {JSONRPCHTTPProvider} from 'eip-1193-json-provider';
import {EIP1193ProviderExtraMethods, EIP1193ProviderWithoutEvents} from 'eip-1193';

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

export const provider = new JSONRPCHTTPProvider('http://127.0.0.1:8545');
const indexer = initIndexer(db, provider as EIP1193ProviderWithoutEvents & EIP1193ProviderExtraMethods);
async function sync() {
	console.log(`syncing...`);
	await indexer.sync();
	console.log(`...complete`);
}

async function onTimer() {
	await sync();
	setTimeout(onTimer, 1000);
}

onTimer();
