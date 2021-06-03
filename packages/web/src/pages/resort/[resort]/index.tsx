import { ssrRequest } from '@lib/common/ssrRequest';
import {
  GetResortByNameWithMembersDocument,
  GetResortByNameWithMembersQueryVariables,
  useGetResortByNameWithMembersQuery,
  useJoinResortMutation,
} from '@oasis-sh/react-gql';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Navbar, Container, ResortHeader } from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';

interface IResortProps {
  variables: GetResortByNameWithMembersQueryVariables;
}
const Resort: React.FC<IResortProps> = ({ variables }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useGetResortByNameWithMembersQuery({
    variables,
  }).data?.getResortByName;

  const [joinMutation] = useJoinResortMutation();

  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <Container>
        <div className="flex-col mt-20 ">
          <div className="flex justify-center">
            <ResortHeader
              resortData={data}
              joinResort={() => {
                joinMutation({ variables: { resortId: data?.id ?? '' } });
              }}
            />
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
