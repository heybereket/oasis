// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  Post as TPost,
  useLikeDislikePostMutation,
  User,
  useDeletePostMutation,
  ReportEntityMutationHookResult,
} from '@oasis-sh/react-gql';
import React from 'react';
import Post from '../post/Post';
import TabData from './TabData';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';

type Props = {
  posts: TPost[];
  likeDislikePost: ReturnType<typeof useLikeDislikePostMutation>[0];
  deletePost: ReturnType<typeof useDeletePostMutation>[0];
  markdown: (text: string) => JSX.Element;
  currentUser?: User;
  reportPost?: ReportEntityMutationHookResult[0];
  fetch: (limit: number, offset: number) => Promise<TPost[]>;
  isInUpvotesTab?: boolean
};

export const Posts: React.FC<Props> = ({
  posts,
  markdown,
  likeDislikePost,
  currentUser,
  deletePost,
  reportPost,
  fetch,
  isInUpvotesTab
}) => {
  return (
      <div className={isInUpvotesTab ? `mt-8 bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]` : ''}>
        {posts.length
        ? <InfiniteScrollWrapper
          amountPerFetch={10}
          defaultItems={posts}
          fetch={fetch}
          renderComponent={(post, index) => (
            <div key={index} className="mb-6">
              <Post
                post={post as TPost}
                currentUser={currentUser}
                deletePost={(id) => {
                  deletePost({
                    variables: { postId: id },
                  });
                  window.location.reload();
                }}
                markdown={markdown}
                bgColorOveride={'bg-gray-900'}
                likePost={() => {
                  likeDislikePost({
                    variables: {
                      dislike: false,
                      like: true,
                      postId: post.id,
                    },
                  });
                  // window.location.reload();
                }}
                dislikePost={() => {
                  likeDislikePost({
                    variables: {
                      dislike: true,
                      like: false,
                      postId: post.id,
                    },
                  });
                  // window.location.reload();
                }}
                reportPost={reportPost}
              />
            </div>
          )}
        />
        : (!isInUpvotesTab
          ? <TabData
              title={`${currentUser?.name}'s Posts`}
              content={`@${currentUser?.username} currently does not have any posts.`}
            />
            : <TabData
              title={`${currentUser?.name}'s Upvotes`}
              content={`@${currentUser?.username} currently has not upvoted any posts.`}
            />
          )
        }
      </div>
  );
};
