import {builder} from './builder';

export const BlockObjectType = builder.simpleObject('CreateBlockResponse', {
	fields: (t) => ({
		hash: t.string(),
		number: t.int(),
	}),
});

export const BlockObjectInput = builder.inputType('BlockObjectInput', {
	fields: (t) => ({
		hash: t.string({required: true}),
		number: t.int({required: true}),
	}),
});

export const TransactionObjectType = builder.simpleObject('CreateTransactionResponse', {
	fields: (t) => ({
		hash: t.string(),
		from: t.string(),
		to: t.string({nullable: true}),
	}),
});

export const TransactionObjectInput = builder.inputType('TransactionObjectInput', {
	fields: (t) => ({
		hash: t.string({required: true}),
		from: t.string({required: true}),
		to: t.string(),
	}),
});

export const AddressObjectType = builder.simpleObject('CreateAddressResponse', {
	fields: (t) => ({
		address: t.string(),
	}),
});

export const AddressObjectInput = builder.inputType('AddressObjectInput', {
	fields: (t) => ({
		address: t.string({required: true}),
	}),
});
