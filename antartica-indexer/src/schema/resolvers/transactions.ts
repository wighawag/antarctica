import {builder} from '../../builder';

import {TransactionObjectType, TransactionObjectInput} from '../typeDefs';

builder.queryField('transactions', (t) =>
	t.field({
		type: [TransactionObjectType],
		resolve: async (root, args, ctx) => {
			return await ctx.db.selectFrom('transactions').selectAll().execute();
		},
	})
);

builder.queryField('transaction', (t) =>
	t.field({
		type: TransactionObjectType,
		args: {
			hash: t.arg.string({required: true}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db
				.selectFrom('transactions')
				.selectAll()
				.where('hash', '=', args.hash)
				.executeTakeFirstOrThrow();
		},
	})
);

builder.mutationField('create_transaction', (t) =>
	t.field({
		type: TransactionObjectType,
		args: {
			input: t.arg({
				type: TransactionObjectInput,
				required: true,
			}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db
				.insertInto('transactions')
				.values({
					hash: args.input.hash,
					from: args.input.from,
					to: args.input.to,
				})
				.returningAll()
				.executeTakeFirstOrThrow();
		},
	})
);

builder.mutationField('update_transaction', (t) =>
	t.field({
		type: TransactionObjectType,
		args: {
			input: t.arg({
				type: TransactionObjectInput,
				required: true,
			}),
		},
		resolve: async (root, args, ctx) => {
			const data = {
				hash: args.input.hash,
				from: args.input.from,
				to: args.input.to,
			};
			return await ctx.db
				.insertInto('transactions')
				.values(data)
				.onConflict((oc) => oc.column('hash').doUpdateSet(data))
				.returningAll()
				.executeTakeFirstOrThrow();
		},
	})
);

builder.mutationField('remove_transaction', (t) =>
	t.field({
		type: TransactionObjectType,
		args: {
			hash: t.arg.string({required: true}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db
				.deleteFrom('transactions')
				.where('hash', '=', args.hash)
				.returningAll()
				.executeTakeFirstOrThrow();
		},
	})
);
