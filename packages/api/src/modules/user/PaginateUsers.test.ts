import { client } from '@utils/test-utils/gql-request';
import { gql } from 'apollo-server-core';

describe('Paginate Users test', () => {
	it('Paginate Users', async () => {
		const paginateQuery = gql`
			query {
				paginateUsers(limit: 10, offset: 0) {
					id
				}
			}
		`;
		const res = await client.query({
			query: paginateQuery,
		});
		expect(res.data.paginateUsers).toBeInstanceOf(Array);
	});
});
