import { graphql } from '$houdini';
import type { GetBlockVariables } from './$houdini';

export const _houdini_load = graphql`
	query GetBlock($hash: String!) {
		block(hash: $hash) {
			hash
			number
		}
	}
`;

export const _UserInfoVariables: GetBlockVariables = ({ params }) => {
	return {
		hash: params.hash
	};
};
