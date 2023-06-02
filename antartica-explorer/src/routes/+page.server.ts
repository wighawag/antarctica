import { db } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (() => {
	const blocks = db.getBlocks();

	return {
		blocks
	};
}) satisfies PageServerLoad;
