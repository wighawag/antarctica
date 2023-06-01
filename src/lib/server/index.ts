import { setupDB } from './db';
import { initIndexer } from './indexer';
import { JSONRPCHTTPProvider } from 'eip-1193-json-provider';

export const provider = new JSONRPCHTTPProvider('http://127.0.0.1:8545');
export const db = setupDB();
export const indexer = initIndexer(db, provider);
