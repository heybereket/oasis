import { createClient } from '@utils/test-utils/gql-request';
import { gql } from 'apollo-server-express';

describe('MakeReport mutation test', () => {
  it('Expect to createReport mutation to return true when trying to create a valid report', async () => {
    const createReportMutation = gql`
      mutation CreateReport($id: String!) {
        makeReport(
          accuseId: $id
          data: { type: InappropriateContent, information: "Test Report" }
        )
      }
    `;

    const res = (
      await createClient().mutate({
        mutation: createReportMutation,
        variables: { id: 'secondaryUserId' },
      })
    ).data.makeReport;

    expect(res).toBeTruthy();
  });
});
