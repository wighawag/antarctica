import { db } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (() => {
	const transactions = db.getTransactions();

	return {
		transactions
	};
}) satisfies PageServerLoad;
