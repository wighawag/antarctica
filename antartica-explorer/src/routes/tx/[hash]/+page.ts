import { graphql } from '$houdini';
import type { GetTransactionVariables } from './$houdini';

export const _houdini_load = graphql`
	query GetTransaction($hash: String!) {
		transaction(hash: $hash) {
			hash
			from
			to
		}
	}
`;

export const _GetTransactionVariables: GetTransactionVariables = ({ params }) => {
	return {
		hash: params.hash
	};
};
