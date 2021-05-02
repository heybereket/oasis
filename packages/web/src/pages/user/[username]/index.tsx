import { Navbar } from '@components/MainNavbar';
import {
  GetUserByNameDocument,
  MutationUpdateProfileArgs,
  useGetUserByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/ssrRequest';
import { contextFromToken } from '@oasis/api/dist/utils/contextFromToken';
import { SEO } from '../../../components/page/SEO';
import { apolloClient } from '@lib/apolloClient';
import { UpdateProfileDocument } from '@oasis/client-gql';

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

  const updateProfile = (
    avatar: string,
    banner: string,
    bio: string,
    name: string,
    username: string
  ) => {
    const safeUsername = username !== data?.username ? username : null;
    apolloClient.mutate<any, MutationUpdateProfileArgs>({
      mutation: UpdateProfileDocument,
      variables: {
        data: {
          avatar,
          banner,
          bio,
          name,
          username: safeUsername,
        },
      },
    });
  };

  return (
    <>
      {/* User Exists */}
      {data?.username !== undefined && (
        <SEO
          title={data?.name + ' — Oasis'}
          ogTitle={data?.name + ' — Oasis'}
          ogDescription={`@${data?.username} — ${data?.bio ?? ''}`}
          ogImage={data?.avatar}
        />
      )}
      {/* User does not exist */}
      {data?.username === undefined && (
        <SEO
          title={'User Not Found — Oasis'}
          ogTitle={'User Not Found — Oasis'}
          ogDescription={`Oasis user not found`}
        />
      )}

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
