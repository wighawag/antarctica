import {builder} from '../builder';

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
