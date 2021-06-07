import { createClient } from '@utils/testing/gql-request';
import { reporteeUserId } from '@utils/testing/seedDatabase';
import { gql } from 'apollo-server-express';

describe('MakeReport mutation test', () => {
  it('Expect to createReport mutation to return true when trying to create a valid report', async () => {
    const createReportMutation = gql`
      mutation CreateReport($id: String!) {
        makeReport(
          reporteeId: $id
          data: { type: InappropriateContent, information: "Test Report" }
        )
      }
    `;

    const res = (
      await createClient().mutate({
        mutation: createReportMutation,
        variables: { id: reporteeUserId },
      })
    ).data.makeReport;

    expect(res).toBeTruthy();
  });
});
