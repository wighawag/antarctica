#! /usr/bin/env node
import {loadEnv} from 'ldenv';
loadEnv();

import {Command} from 'commander';
import pkg from '../package.json';
import {run} from '.';
import type {Options} from './types';

const program = new Command();
const name = pkg.name;
const cmdName = 'dreveal';

program.name(cmdName).version(pkg.version).usage(`${cmdName} -n <node-rpc-url>`).description('Run A reveal service');

if (process.env.ETHEREUM_NODE) {
	program.option(
		'-n, --node-url <value>',
		`ethereum's node url (fallback on ETHEREUM_NODE env variable)`,
		process.env.ETHEREUM_NODE
	);
} else {
	program.requiredOption('-n, --node-url <value>', `ethereum's node url (fallback on ETHEREUM_NODE env variable)`);
}

program.parse(process.argv);

const options: Options = program.opts();

run(options).then(() => {
	console.log('DONE');
});
