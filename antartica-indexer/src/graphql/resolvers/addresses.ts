import {builder} from '../builder';

import {AddressObjectType, AddressObjectInput} from '../typeDefs';

builder.queryField('addresses', (t) =>
	t.field({
		type: [AddressObjectType],
		resolve: async (root, args, ctx) => {
			return await ctx.db.selectFrom('addresses').selectAll().execute();
		},
	})
);

builder.queryField('address', (t) =>
	t.field({
		type: AddressObjectType,
		args: {
			address: t.arg.string({required: true}),
		},
		resolve: async (root, args, ctx) => {
			return await ctx.db
				.selectFrom('addresses')
				.selectAll()
				.where('address', '=', args.address)
				.executeTakeFirstOrThrow();
		},
	})
);
