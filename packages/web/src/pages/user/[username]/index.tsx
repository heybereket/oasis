import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { StyledMarkdown } from '@oasis-sh/parser';
import { login, logout } from '@lib/auth/login';
import {
  GetUserByNameDocument,
  useGetUserByNameQuery,
  useFollowUserMutation,
  GetUserByNameQueryVariables,
  useUpvoteDownvotePostMutation,
  useGetUsersPostsLazyQuery,
  useGetUsersUpvotedPostsLazyQuery,
  GetCurrentUserDocument,
  useDeletePostMutation,
  useGetUsersCommentsLazyQuery,
  useUpvoteDownvoteCommentMutation,
  useReportEntityMutation,
  GetUserByNameQuery,
  User,
  Post as TPost,
  Comment as TComment,
} from '@oasis-sh/react-gql';
import {
  About,
  Comments,
  UpArrow,
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
  CommentsTab as CommentsCenterTab,
} from '@oasis-sh/ui';
import { SEO } from 'src/shared/SEO';
import { useState, useEffect } from 'react';

enum CenterColumnTabState {
  AboutTab,
  PostsTab,
  UpvotesTab,
  CommentsTab,
}

interface CenterColumnProps {
  tabState: CenterColumnTabState;
  props: ProfileProps;
  data: GetUserByNameQuery['getUserByName'];
  myUser?: User;
  profileUser?: User;
}

const CenterColumnComponent: React.FC<CenterColumnProps> = ({
  tabState,
  props,
  data,
  myUser,
  profileUser,
}) => {
  const [upvoteDownvotePost] = useUpvoteDownvotePostMutation();
  const [upvoteDownvoteComment] = useUpvoteDownvoteCommentMutation();
  const [deletePost] = useDeletePostMutation();

  const [getPosts, postsData] = useGetUsersPostsLazyQuery({
    variables: {
      postsLimit: 10,
      postsOffset: 0,
      username: props.username,
    },
  });

  const [getUpvotedPosts, upvotedPostsData] = useGetUsersUpvotedPostsLazyQuery({
    variables: {
      postsLimit: 10,
      postsOffset: 0,
      username: props.username,
    },
  });

  const [getComments, commentsData] = useGetUsersCommentsLazyQuery({
    variables: {
      commentsLimit: 10,
      commentsOffset: 0,
      username: props.username,
    },
  });

  const [reportEntity] = useReportEntityMutation();

  // Refresh tab data on state change
  useEffect(() => {
    switch (tabState) {
      case CenterColumnTabState.CommentsTab:
        getComments();
        break;
      case CenterColumnTabState.UpvotesTab:
        getUpvotedPosts();
        break;
      case CenterColumnTabState.PostsTab:
        getPosts();
        break;
    }
  }, [tabState]);

  useEffect(() => console.log('Remounted'), []);
  switch (tabState) {
    case CenterColumnTabState.AboutTab:
      return (
        <Bio
          bio={data?.bio}
          name={data?.name}
          username={data?.username}
          badges={data?.badges}
          markdown={(text) => {
            return <StyledMarkdown isBio={true} text={text} />;
          }}
        />
      );

    case CenterColumnTabState.PostsTab:
      if (!postsData.called) {
        getPosts();
        return <div></div>;
      } else {
        return (
          <PostsTabItem
            markdown={(text: any) => (
              <StyledMarkdown text={text} isBio={false} isPost={true} />
            )}
            posts={
              (postsData.data?.userOnlyPosts?.posts.items as TPost[]) ?? []
            }
            upvoteDownvotePost={upvoteDownvotePost}
            currentUser={myUser}
            profileUser={profileUser}
            deletePost={deletePost}
            reportPost={reportEntity}
            fetch={async (limit, offset) => {
              const newData = (
                await postsData.fetchMore({
                  variables: {
                    postsLimit: limit,
                    postsOffset: offset,
                  },
                })
              ).data.userOnlyPosts?.posts.items as TPost[];
              return newData;
            }}
          />
        );
      }

    case CenterColumnTabState.UpvotesTab:
      if (!upvotedPostsData.called) {
        getUpvotedPosts();
        return <div />;
      } else {
        return (
          <PostsTabItem
            isInProfileUpvotes
            markdown={(text: any) => (
              <StyledMarkdown text={text} isBio={false} isPost={true} />
            )}
            currentUser={myUser}
            profileUser={profileUser}
            posts={
              (upvotedPostsData.data?.getUserByName?.upvotedPosts
                .items as TPost[]) ?? []
            }
            upvoteDownvotePost={upvoteDownvotePost}
            deletePost={deletePost}
            reportPost={reportEntity}
            fetch={async (limit, offset) => {
              const newData = (
                await upvotedPostsData.fetchMore({
                  variables: {
                    postsLimit: limit,
                    postsOffset: offset,
                  },
                })
              ).data.getUserByName?.upvotedPosts.items as TPost[];
              return newData;
            }}
          />
        );
      }

    case CenterColumnTabState.CommentsTab:
      if (!commentsData.called) {
        getComments();
        return <div />;
      } else {
        return (
          <CommentsCenterTab
            comments={
              (commentsData.data?.userOnlyComments?.comments
                .items as TComment[]) ?? []
            }
            upvoteDownvoteComment={upvoteDownvoteComment}
            markdown={(text) => (
              <StyledMarkdown text={text} isBio={false} isPost={true} />
            )}
            currentUser={myUser}
            profileUser={profileUser}
            reportComment={reportEntity}
            fetch={async (limit, offset) => {
              const newData = (
                await commentsData.fetchMore({
                  variables: {
                    commentsLimit: limit,
                    commentsOffset: offset,
                  },
                })
              ).data.userOnlyComments?.comments.items as TComment[];
              return newData;
            }}
          />
        );
      }

    default:
      return <div></div>;
  }
};

interface ProfileProps {
  initialApolloState: any;
  username: string;
  vars: GetUserByNameQueryVariables;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const profileData = useGetUserByNameQuery({
    variables: props.vars,
  }).data?.getUserByName;

  const [follow] = useFollowUserMutation({
    variables: { userId: profileData?.id ?? '' },
  });

  const { user: myUser, currentUserLoading } = useGetCurrentUser();

  const [tabState, setTabState] = useState<CenterColumnTabState>(
    CenterColumnTabState.AboutTab
  );

  const viewingOwnProfile = profileData?.id === myUser?.id;

  return (
    <>
      <SEO
        title={profileData?.name ? profileData?.name : profileData?.username}
        metaDesc={`@${profileData?.username} — ${profileData?.bio ?? ''}`}
        metaImg={profileData?.avatar}
      />
      <Navbar
        user={myUser}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="flex w-screen flex-col">
        <ProfileBanner bannerUrl={profileData?.banner} />
        {/* Large and Medium Screens */}
        <Container>
          <div className="hidden md-50:grid grid-cols-12 transform -translate-y-12 px-8">
            {/* Left Side */}
            <div className="col-span-8 flex flex-col mr-8">
              <LargeUserCard
                avatar={profileData?.avatar}
                name={profileData?.name}
                username={profileData?.username}
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
                    name="Upvotes"
                    active={tabState === CenterColumnTabState.UpvotesTab}
                    icon={UpArrow}
                    onClick={() => setTabState(CenterColumnTabState.UpvotesTab)}
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
                <CenterColumnComponent
                  key="CenterColumn"
                  props={props}
                  tabState={tabState}
                  data={profileData}
                  myUser={myUser}
                  profileUser={(profileData as User) ?? undefined}
                />
              </div>
            </div>
            {/* Right Side */}
            <div className="col-span-4 transform translate-y-16 flex flex-col">
              <div
                className={`grid lg:grid-rows-1 ${
                  viewingOwnProfile
                    ? 'lg:grid-cols-1 md:grid-rows-1'
                    : 'lg:grid-cols-2 md:grid-rows-2'
                } gap-2`}
              >
                {!viewingOwnProfile && (
                  <Button
                    color="gray"
                    className="md:row-span-1 lg:col-span-1 text-sm"
                  >
                    Send Message
                  </Button>
                )}
                <Button
                  color="primary"
                  className="md:row-span-1 lg:col-span-1 text-sm"
                  onClick={() => {
                    if (profileData?.id !== myUser?.id) {
                      follow();
                    }
                  }}
                >
                  {viewingOwnProfile
                    ? 'Edit Profile'
                    : `Follow @${profileData?.username}`}
                </Button>
              </div>
              <FollowersInfo
                size="large"
                followers={profileData?.followers.total}
                following={profileData?.following.total}
                posts={profileData?.posts.total}
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
            avatar={profileData?.avatar}
            name={profileData?.name}
            username={profileData?.username}
          />
          <FollowersInfo
            size="small"
            followers={profileData?.followers.total}
            following={profileData?.following.total}
            posts={profileData?.posts.total}
          />
          <div
            className={`grid ${
              viewingOwnProfile ? 'grid-cols-1' : 'grid-cols-2'
            } mt-6 w-full max-w-sm gap-1 md:gap-2`}
          >
            {!viewingOwnProfile && (
              <Button color="gray" className="col-span-2 md:col-span-1 text-sm">
                Send Message
              </Button>
            )}
            <Button
              color="primary"
              className="col-span-2 md:col-span-1 text-sm"
              onClick={() => {
                if (profileData?.id !== myUser?.id) {
                  follow();
                }
              }}
            >
              {viewingOwnProfile
                ? 'Edit Profile'
                : `Follow @${profileData?.username}`}
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
                name="Upvotes"
                active={tabState === CenterColumnTabState.UpvotesTab}
                icon={UpArrow}
                onClick={() => setTabState(CenterColumnTabState.UpvotesTab)}
              />
              <TabItem
                name="Comments"
                active={tabState === CenterColumnTabState.CommentsTab}
                icon={Comments}
                onClick={() => setTabState(CenterColumnTabState.CommentsTab)}
              />
            </div>
            <CenterColumnComponent
              key="CenterColumn"
              props={props}
              tabState={tabState}
              data={profileData}
              myUser={myUser}
              profileUser={(profileData as User) ?? undefined}
            />
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
        {
          document: GetCurrentUserDocument,
        },
      ]),
    },
  };
};

export default Profile;
