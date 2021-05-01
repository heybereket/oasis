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
  return (
    <>
      <Navbar />
      <div className="flex w-screen">
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #0C111B 100%), url(/static/mountain.jpeg) no-repeat center',
            backgroundSize: 'cover',
          }}
          className="flex-grow h-64"
        ></div>
      </div>
    </>
  );
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
