import { Navbar } from '@components/MainNavbar';
import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/ssrRequest';
import { contextFromToken } from '@oasis/api/dist/utils/contextFromToken';

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

  return (
    <>
      <Navbar />
      {data?.name}
      {data?.username}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const cookies = req.headers.cookie ?? '';
  const cookiesArr = cookies.split('; ');
  const cookieData = cookiesArr.find((row) => row.startsWith('token='));
  const token = cookieData?.split('=')[1];
  return {
    props: {
      username: query.username,
      initialApolloState: await ssrRequest({
        document: GetUserByNameDocument,
        variables: { username: query.username },
        context: contextFromToken(token ?? '', req.socket.address()),
      }),
    },
  };
};

export default Profile;
