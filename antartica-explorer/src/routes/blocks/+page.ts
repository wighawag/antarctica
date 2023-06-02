import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query GetBlocksPaginated {
		blocks(limit: 10, direction: desc) @paginate {
			hash
			number
		}
	}
`;
