import { ssrRequest } from '@lib/common/ssrRequest';
import {
  GetResortByNameDocument,
  QueryGetResortByNameArgs,
  useGetResortByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import React from 'react';

interface IResortProps {
  variables: QueryGetResortByNameArgs;
}

const Resort: React.FC<IResortProps> = ({ variables }) => {
  const data = useGetResortByNameQuery({
    variables,
  }).data?.getResortByName;

  return <pre>{JSON.stringify(data)}</pre>;
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
