import { useExampleQuery, ExampleDocument } from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/ssrRequest';

export default function ExamplePage(): React.ReactNode {
  const { data, loading } = useExampleQuery();

  console.log({ data, loading });

  return <div>Here is the message: {data?.helloWorld}</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      initialApolloState: await ssrRequest({ document: ExampleDocument }),
    },
  };
};
