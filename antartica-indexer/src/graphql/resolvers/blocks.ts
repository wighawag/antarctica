import {builder} from '../builder';

import {BlockObjectType} from '../typeDefs';

builder.queryField('blocks', (t) =>
	t.field({
		type: [BlockObjectType],
		resolve: async (root, args, ctx) => {
			return await ctx.db.selectFrom('blocks').selectAll().execute();
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
