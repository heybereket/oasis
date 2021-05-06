// import { Navbar } from '@components/Navbar';
import { TabItem } from '@components/profile/TabItem';

import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/ssrRequest';
import { SEOProvider } from '@components/common/SEOProvider';
import { Button } from '@components/common/Button';
import { TopicBadge } from '@components/profile/TopicBadge';
import { Container } from '@components/common/Container';
import { About, Comments, Like, Posts } from '@components/icons';
import { Navbar } from '@components/navbar/Navbar';
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
      <SEOProvider
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
        <Container>
          <div className="hidden md:grid grid-cols-12 transform -translate-y-12 px-8">
            <div className="col-span-8 flex flex-col mr-8">
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
                  <TabItem name="About" active={true} icon={About} />
                  <TabItem name="Posts" active={false} icon={Posts} />
                  <TabItem name="Likes" active={false} icon={Like} />
                  <TabItem name="Comments" active={false} icon={Comments} />
                </div>
                <div className="mt-8 bg-gray-800 rounded-xl py-6 px-6">
                  <h4 className="font-extrabold">
                    About {`@${data?.username}`}
                  </h4>
                  {data?.bio !== null ? (
                    <h5 className="text-gray-300 font-bold">{data?.bio}</h5>
                  ) : (
                    <h5 className="text-gray-300 font-bold">
                      Hmm, it seems like @{data?.username} does not have a bio
                      set.
                    </h5>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-4 transform translate-y-16 flex flex-col">
              <div className="grid md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2 ">
                <Button
                  color="gray"
                  className="md:row-span-1 lg:col-span-1 text-sm"
                >
                  Send Message
                </Button>
                <Button
                  color="primary"
                  className="md:row-span-1 lg:col-span-1 text-sm"
                >
                  Follow @{data?.username}
                </Button>
              </div>
              <div className="mt-8 flex bg-gray-800 rounded-2xl py-4 justify-center gap-12">
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
              <div className="mt-8 flex flex-col bg-gray-800 rounded-2xl py-4 px-6">
                <h4 className="font-black">
                  {data?.name ? data?.name : '@' + data?.username}&#39;s
                  Favourite Topics
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
        </Container>
        <div className="grid md:hidden">[TODO: mobile/tablet design]</div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
