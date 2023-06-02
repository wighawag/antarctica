import {builder} from '../builder';

import {BlockObjectType} from '../typeDefs';

export const Direction = builder.enumType('Direction', {
	values: ['asc', 'desc'] as const,
});

builder.queryField('blocks', (t) =>
	t.field({
		type: [BlockObjectType],
		args: {
			limit: t.arg.int({required: true}),
			offset: t.arg.int(),
			direction: t.arg({
				type: Direction,
				defaultValue: 'asc',
			}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db
				.selectFrom('blocks')
				.selectAll()
				.limit(args.limit)
				.offset(args.offset || 0)
				.orderBy('number', args.direction || 'asc')
				.execute();
		},
	})
);

builder.queryField('block', (t) =>
	t.field({
		type: BlockObjectType,
		args: {
			hash: t.arg.string({required: true}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db.selectFrom('blocks').selectAll().where('hash', '=', args.hash).executeTakeFirstOrThrow();
		},
	})
);

builder.queryField('blockByNumber', (t) =>
	t.field({
		type: BlockObjectType,
		args: {
			number: t.arg.int({required: true}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db.selectFrom('blocks').selectAll().where('number', '=', args.number).executeTakeFirstOrThrow();
		},
	})
);

// builder.mutationField('create_block', (t) =>
// 	t.field({
// 		type: BlockObjectType,
// 		args: {
// 			input: t.arg({
// 				type: BlockObjectInput,
// 				required: true,
// 			}),
// 		},
// 		resolve: async (root, args, ctx) => {
// 			return await ctx.db
// 				.insertInto('blocks')
// 				.values({
// 					hash: args.input.hash,
// 					number: args.input.number,
// 				})
// 				.returningAll()
// 				.executeTakeFirstOrThrow();
// 		},
// 	})
// );

// builder.mutationField('update_block', (t) =>
// 	t.field({
// 		type: BlockObjectType,
// 		args: {
// 			input: t.arg({
// 				type: BlockObjectInput,
// 				required: true,
// 			}),
// 		},
// 		resolve: async (root, args, ctx) => {
// 			const data = {
// 				hash: args.input.hash,
// 				number: args.input.number,
// 			};
// 			return await ctx.db
// 				.insertInto('blocks')
// 				.values(data)
// 				.onConflict((oc) => oc.column('hash').doUpdateSet(data))
// 				.returningAll()
// 				.executeTakeFirstOrThrow();
// 		},
// 	})
// );

// builder.mutationField('remove_block', (t) =>
// 	t.field({
// 		type: BlockObjectType,
// 		args: {
// 			hash: t.arg.string({required: true}),
// 		},
// 		resolve: async (root, args, ctx) => {
// 			return await ctx.db.deleteFrom('blocks').where('hash', '=', args.hash).returningAll().executeTakeFirstOrThrow();
// 		},
// 	})
// );
