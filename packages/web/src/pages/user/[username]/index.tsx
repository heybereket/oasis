import { Navbar } from '@components/MainNavbar';
import { TabItem } from '@components/TabItem';
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
import { Button } from '@components/Button';
import { TopicBadge } from '@components/TopicBadge';
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

  /* eslint-disable @typescript-eslint/no-unused-vars*/
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
      <SEO
        title={data?.name ? data?.name : data?.username + ' — Oasis'}
        metaDesc={`@${data?.username} — ${data?.bio ?? ''}`}
        metaImg={data?.avatar}
      />

      <Navbar />
      <div className="flex w-screen flex-col">
        <div
          style={{
            background: `linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #0C111B 100%), url(${
              data?.banner || '/static/default-banner.png'
            }) no-repeat center`,
            backgroundSize: 'cover',
          }}
          className="flex-grow h-60"
        ></div>
        <div className="hidden lg:grid grid-cols-12 transform -translate-y-12 lg:container mx-auto px-8 xl:px-16">
          <div className="col-span-7  flex flex-col">
            <div className="flex">
              <img src={data?.avatar} className="rounded-full w-40"></img>
              <div className="ml-8 flex flex-col justify-center">
                {data?.name ? (
                  <>
                    <h1 className="leading-none">{data?.name}</h1>
                    <h4 className="text-gray-400 font-bold">
                      @{data?.username}
                    </h4>
                  </>
                ) : (
                  <h1>@{data?.username}</h1>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <div className="flex">
                <TabItem name="About" active={true} />
                <TabItem name="Posts" active={false} />
                <TabItem name="Likes" active={false} />
                <TabItem name="Comments" active={false} />
              </div>
              <div className="mt-6 bg-gray-700 rounded-xl py-4 px-6">
                <h4 className="font-extrabold">
                  About {`@${data?.username}`}
                </h4>
                {data?.bio !== null && (
                  <h5 className="text-gray-300 font-bold">{data?.bio}</h5>
                )}

                {data?.bio === null && (
                  <h5 className="text-gray-300 font-bold">@{data?.username} does not have a bio set, yet.</h5>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-4 transform translate-y-12 flex flex-col">
            <div className="grid grid-cols-2 gap-2 ">
              <Button color="gray" className="col-span-1 text-sm">
                Send Message
              </Button>
              <Button color="primary" className="col-span-1 text-sm">
                Follow {data?.name ? data?.name : '@' + data?.username}
              </Button>
            </div>
            <div className="mt-6 flex bg-gray-700 rounded-2xl py-4 justify-center gap-12">
              <div className="flex flex-col text-center leading-4">
                <span className="text-2xl font-black">32</span>
                <span className="font-extrabold text-sm">Followers</span>
              </div>
              <div className="flex flex-col text-center leading-4">
                <span className="text-2xl font-black">22</span>
                <span className="font-extrabold text-sm">Posts</span>
              </div>
              <div className="flex flex-col text-center leading-4">
                <span className="text-2xl font-black">420</span>
                <span className="font-extrabold text-sm">Following</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col bg-gray-700 rounded-2xl py-4 px-6">
              <h4 className="font-black">
                {data?.name ? data?.name : '@' + data?.username}&#39;s Favourite
                Topics
              </h4>
              <div className="mt-2">
                <TopicBadge content="Machine Learning" />
                <TopicBadge content="Development" />
                <TopicBadge content="JavaScript" />
                <TopicBadge content="Python" />
                <TopicBadge content="Next.JS" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:hidden">[TODO: mobile/tablet design]</div>
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
