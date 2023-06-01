import { indexer } from '$lib/server';

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
