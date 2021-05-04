import { Navbar } from '@components/MainNavbar';
import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/ssrRequest';
// import { contextFromToken } from '@oasis/api/dist/utils/contextFromToken';

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
      <div className="flex w-screen flex-col">
        <div
          style={{
            background: `linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #0C111B 100%), url(${
              data?.banner || '/static/mountain.jpeg'
            }) no-repeat center`,
            backgroundSize: 'cover',
          }}
          className="flex-grow h-64"
        ></div>
        {data?.name}
        {data?.username}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  //const cookies = req.headers.cookie ?? '';
  //const cookiesArr = cookies.split('; ');
  //const cookieData = cookiesArr.find((row) => row.startsWith('token='));
  //const token = cookieData?.split('=')[1];
  return {
    props: {
      username: query.username,
      initialApolloState: await ssrRequest({
        document: GetUserByNameDocument,
        variables: { username: query.username },
        // context: contextFromToken(token ?? '', req.socket.address()),
      }),
    },
  };
};

export default Profile;
