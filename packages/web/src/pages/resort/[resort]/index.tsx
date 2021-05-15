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

interface IResortProps {
  variables: QueryGetResortByNameArgs;
}
const Resort: React.FC<IResortProps> = ({ variables }) => {
  const data = useGetResortByNameQuery({
    variables,
  }).data?.getResortByName;

  return (
    <>
      <Navbar />
      <Container>
        <div className="flex-col mt-20 ">
          <div className="flex justify-center">
            <div
              className="max-w-7xl rounded-2xl h-48 background-cover flex-grow flex px-16 items-center"
              style={{
                background: `linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://resi.ze-robot.com/dl/ul/ultraviolet-4k-wallpaper-2560%C3%971600.jpg)`,
                backgroundSize: '100%',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex-col">
                <span className="uppercase font-mono text-xs font-bold tracking-widest text-gray-500">
                  Resorts / <span className="text-gray-200">Coding</span>
                </span>
                <h2>TypeScript</h2>
              </div>
            </div>
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
