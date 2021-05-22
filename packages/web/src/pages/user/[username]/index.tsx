import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
  useFollowUserMutation,
} from '@oasis-sh/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { About, Comments, Like, Posts } from '@oasis-sh/ui';
import {
  Container,
  Navbar,
  TabItem,
  Button,
  TopicBadge,
  LargeUserCard,
  SmallUserCard,
  ProfileBanner,
  FollowersInfo,
  Bio,
} from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { SEOProvider } from '@components/common/SEOProvider';
import StyledMarkdown from '@components/markdown/StyledMarkdown';
import { Login, Logout } from '@lib/login';

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

  const [follow] = useFollowUserMutation({
    variables: { userId: data?.id ?? '' },
  });

  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <SEOProvider
        title={data?.name ? data?.name : data?.username + ' — Oasis'}
        metaDesc={`@${data?.username} — ${data?.bio ?? ''}`}
        metaImg={data?.avatar}
      />
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={Login}
        logout={Logout}
      />
      <div className="flex w-screen flex-col">
        <ProfileBanner bannerUrl={data?.banner} />
        {/* Large and Medium Screens */}
        <Container>
          <div className="hidden md-50:grid grid-cols-12 transform -translate-y-12 px-8">
            {/* Left Side */}
            <div className="col-span-8 flex flex-col mr-8">
              <LargeUserCard
                avatar={data?.avatar}
                name={data?.name}
                username={data?.username}
              />
              <div className="flex flex-col mt-6">
                <div className="flex">
                  <TabItem name="About" active={true} icon={About} />
                  <TabItem name="Posts" active={false} icon={Posts} />
                  <TabItem name="Likes" active={false} icon={Like} />
                  <TabItem name="Comments" active={false} icon={Comments} />
                </div>
                <Bio
                  bio={data?.bio}
                  name={data?.name}
                  username={data?.username}
                  badges={data?.badges}
                  marginTop="8"
                  markdown={(text) => {
                    return <StyledMarkdown isBio={true} text={text} />;
                  }}
                />
              </div>
            </div>
            {/* Right Side */}
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
                  onClick={() => {
                    follow();
                  }}
                >
                  {data?.id === user?.id
                    ? 'Edit Profile'
                    : `Follow @${data?.username}`}
                </Button>
              </div>
              <FollowersInfo
                size="large"
                followers={data?.followers.total}
                following={data?.following.total}
                posts={data?.posts.total}
              />
              <div className="mt-8 flex flex-col bg-gray-800 rounded-2xl py-4 px-6">
                <h4 className="font-extrabold">Topics Following</h4>
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
        {/* Small Screens */}
        <div className="flex flex-col md-50:hidden transform -translate-y-20 md:-translate-y-32 items-center mx-6 sm-50:mx-8">
          <SmallUserCard
            avatar={data?.avatar}
            name={data?.name}
            username={data?.username}
          />
          <FollowersInfo
            size="small"
            followers={data?.followers.total}
            following={data?.following.total}
            posts={data?.posts.total}
          />
          <div className="grid grid-cols-2 mt-6 w-full max-w-sm gap-1 md:gap-2">
            <Button color="gray" className="col-span-2 md:col-span-1 text-sm">
              Send Message
            </Button>
            <Button
              color="primary"
              className="col-span-2 md:col-span-1 text-sm"
            >
              {data?.id === user?.id
                ? 'Edit Profile'
                : `Follow @${data?.username}`}
            </Button>
          </div>

          <div className="flex flex-col mt-8">
            <div className="flex justify-center space-x-2 sm-50:space-x-4">
              <TabItem name="About" active={true} icon={About} />
              <TabItem name="Posts" active={false} icon={Posts} />
              <TabItem name="Likes" active={false} icon={Like} />
              <TabItem name="Comments" active={false} icon={Comments} />
            </div>
            <Bio
              badges={data?.badges}
              bio={data?.bio}
              marginTop="4"
              username={data?.username}
              name={data?.username}
              markdown={(text) => {
                return <StyledMarkdown isBio={true} text={text} />;
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  return {
    props: {
      username: query.username,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetUserByNameDocument,
          variables: { username: query.username },
        },
      ]),
    },
  };
};

export default Profile;
