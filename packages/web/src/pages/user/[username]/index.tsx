import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import StyledMarkdown from '@markdown/StyledMarkdown';
import { login, logout } from '@lib/login';
import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
  useFollowUserMutation,
  GetUserByNameQueryVariables,
  useLikeDislikePostMutation,
  useGetUsersPostsLazyQuery,
} from '@oasis-sh/client-gql';
import {
  About,
  Comments,
  Like,
  Posts,
  Navbar,
  Container,
  Button,
  TabItem,
  TopicBadge,
  LargeUserCard,
  SmallUserCard,
  ProfileBanner,
  FollowersInfo,
  Bio,
  PostsTab as PostsTabItem,
} from '@oasis-sh/ui';
import { SEO } from '@utils/SEO';
import { useState } from 'react';

interface ProfileProps {
  initialApolloState: any;
  username: string;
  vars: GetUserByNameQueryVariables;
}

enum CenterColumnTabState {
  AboutTab,
  PostsTab,
  LikesTab,
  CommentsTab,
}

const Profile: React.FC<ProfileProps> = (props) => {
  const data = useGetUserByNameQuery({
    variables: props.vars,
  }).data?.getUserByName;

  const [follow] = useFollowUserMutation({
    variables: { userId: data?.id ?? '' },
  });

  const { user, currentUserLoading } = useGetCurrentUser();

  const [tabState, setTabState] = useState<CenterColumnTabState>(
    CenterColumnTabState.AboutTab
  );

  const [likeDislikePost] = useLikeDislikePostMutation();

  const [getPosts, postsData] = useGetUsersPostsLazyQuery({
    variables: {
      postsLimit: 10,
      postsOffset: 0,
      username: props.username,
    },
  });

  const CenterColumnComponent: React.FC = () => {
    switch (tabState) {
      case CenterColumnTabState.AboutTab:
        return (
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
        );

      case CenterColumnTabState.PostsTab:
        if (!postsData.called) {
          console.log('Fetching data');
          getPosts();
          return <div></div>;
        } else {
          console.log('Data Exists');
          return (
            <PostsTabItem
              markdown={(text: any) => (
                <StyledMarkdown text={text} isBio={false} isPost={true} />
              )}
              posts={postsData.data?.userOnlyPosts}
              likeDislikePost={likeDislikePost}
            />
          );
        }
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <SEO
        title={data?.name ? data?.name : data?.username}
        metaDesc={`@${data?.username} — ${data?.bio ?? ''}`}
        metaImg={data?.avatar}
      />
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
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
                  <TabItem
                    name="About"
                    active={tabState === CenterColumnTabState.AboutTab}
                    icon={About}
                    onClick={() => setTabState(CenterColumnTabState.AboutTab)}
                  />
                  <TabItem
                    name="Posts"
                    active={tabState === CenterColumnTabState.PostsTab}
                    icon={Posts}
                    onClick={() => setTabState(CenterColumnTabState.PostsTab)}
                  />
                  <TabItem
                    name="Likes"
                    active={tabState === CenterColumnTabState.LikesTab}
                    icon={Like}
                    onClick={() => setTabState(CenterColumnTabState.LikesTab)}
                  />
                  <TabItem
                    name="Comments"
                    active={tabState === CenterColumnTabState.CommentsTab}
                    icon={Comments}
                    onClick={() =>
                      setTabState(CenterColumnTabState.CommentsTab)
                    }
                  />
                </div>
                <CenterColumnComponent />
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
              <TabItem
                name="About"
                active={tabState === CenterColumnTabState.AboutTab}
                icon={About}
                onClick={() => setTabState(CenterColumnTabState.AboutTab)}
              />
              <TabItem
                name="Posts"
                active={tabState === CenterColumnTabState.PostsTab}
                icon={Posts}
                onClick={() => setTabState(CenterColumnTabState.PostsTab)}
              />
              <TabItem
                name="Likes"
                active={tabState === CenterColumnTabState.LikesTab}
                icon={Like}
                onClick={() => setTabState(CenterColumnTabState.LikesTab)}
              />
              <TabItem
                name="Comments"
                active={tabState === CenterColumnTabState.CommentsTab}
                icon={Comments}
                onClick={() => setTabState(CenterColumnTabState.CommentsTab)}
              />
            </div>
            <CenterColumnComponent />
            {/* <Bio
              badges={data?.badges}
              bio={data?.bio}
              marginTop="4"
              username={data?.username}
              name={data?.username}
              markdown={(text) => {
                return <StyledMarkdown isBio={true} text={text} />;
              }}
            /> */}
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
  const vars: GetUserByNameQueryVariables = {
    username: query.username as string,
  };
  return {
    props: {
      vars,
      username: query.username,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetUserByNameDocument,
          variables: vars,
        },
      ]),
    },
  };
};

export default Profile;
