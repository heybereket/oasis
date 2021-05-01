import { Navbar } from '@components/MainNavbar';
import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/ssrRequest';

interface ProfileProps {
  initialApolloState: any;
  username: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const data = useGetUserByNameQuery({
    variables: {
      username: props.username,
    },
  }).data?.getUserByName;
  console.log(data);
  return <Navbar />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: context.query.username,
      initialApolloState: await ssrRequest({
        document: GetUserByNameDocument,
        variables: { username: context.query.username },
      }),
    },
  };
};

export default Profile;
