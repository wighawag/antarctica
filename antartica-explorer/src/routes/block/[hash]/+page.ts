import { graphql } from '$houdini';
import type { GetBlockVariables } from './$houdini';

export const _houdini_load = graphql`
	query GetBlock($hash: String!, $number: Int!, $isHash: Boolean!) {
		block(hash: $hash) @include(if: $isHash) {
			hash
			number
		}
		blockByNumber(number: $number) @skip(if: $isHash) {
			hash
			number
		}
	}
`;

export const _GetBlockVariables: GetBlockVariables = ({ params }) => {
	if (params.hash.startsWith('0x')) {
		return {
			hash: params.hash,
			isHash: true,
			number: 0
		};
	} else {
		return {
			hash: '0x00',
			isHash: false,
			number: parseInt(params.hash)
		};
	}
};
