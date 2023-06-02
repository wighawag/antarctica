import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query GetTransactions {
		transactions {
			hash
			block_hash
			from
			to
		}
	}
`;
