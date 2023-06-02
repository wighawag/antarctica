import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query GetBlocksPaginated {
		blocks {
			hash
			number
		}
	}
`;
