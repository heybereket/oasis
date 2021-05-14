import { ssrRequest } from '@lib/common/ssrRequest';
import {
  GetResortByNameDocument,
  QueryGetResortByNameArgs,
  useGetResortByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import React from 'react';

const Resort: React.FC<{ variables: QueryGetResortByNameArgs }> = ({
  variables,
}) => {
  const data = useGetResortByNameQuery({
    variables,
  }).data?.getResortByName;

  return <pre>{JSON.stringify(data)}</pre>;
};

export default Resort;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  return {
    props: {
      name: query.resort,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetResortByNameDocument,
          variables: { name: query.resorts } as QueryGetResortByNameArgs,
        },
      ]),
    },
  };
};
