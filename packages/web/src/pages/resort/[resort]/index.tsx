import { ssrRequest } from '@lib/common/ssrRequest';
import {
  GetResortByNameDocument,
  QueryGetResortByNameArgs,
  useGetResortByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Container } from '@components/common/Container';
import ResortHeader from '@components/resort/ResortHeader';

interface IResortProps {
  variables: QueryGetResortByNameArgs;
}
const Resort: React.FC<IResortProps> = ({ variables }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useGetResortByNameQuery({
    variables,
  }).data?.getResortByName;

  return (
    <>
      <Navbar />
      <Container>
        <div className="flex-col mt-20 ">
          <div className="flex justify-center">
            <ResortHeader />
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
  return {
    props: {
      variables: {
        name: query.resort as string,
      },
      initialApolloState: await ssrRequest(req, [
        {
          document: GetResortByNameDocument,
          variables: { name: query.resort } as QueryGetResortByNameArgs,
        },
      ]),
    },
  };
};
