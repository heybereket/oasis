import { ssrRequest } from '@lib/common/ssrRequest';
import {
  GetResortByNameWithMembersDocument,
  GetResortByNameWithMembersQueryVariables,
  useGetResortByNameWithMembersQuery,
} from '@oasis-sh/client-gql';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Container } from '@components/common/Container';
import ResortHeader from '@components/resort/ResortHeader';

interface IResortProps {
  variables: GetResortByNameWithMembersQueryVariables;
}
const Resort: React.FC<IResortProps> = ({ variables }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useGetResortByNameWithMembersQuery({
    variables,
  }).data?.getResortByName;

  return (
    <>
      <Navbar />
      <Container>
        <div className="flex-col mt-20 ">
          <div className="flex justify-center">
            <ResortHeader resortData={data} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resort;

export const getServerSideProps: GetServerSideProps<IResortProps> = async ({
  query,
  req,
}) => {
  const vars: GetResortByNameWithMembersQueryVariables = {
    membersLimit: 5,
    membersOffset: 0,
    name: query.resort as string,
  };
  return {
    props: {
      variables: vars,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetResortByNameWithMembersDocument,
          variables: vars,
        },
      ]),
    },
  };
};
