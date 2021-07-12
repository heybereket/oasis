// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  Post as TPost,
  useUpvoteDownvotePostMutation,
  User,
  useDeletePostMutation,
  ReportEntityMutationHookResult,
} from '@oasis-sh/react-gql';
import React from 'react';
import Post from '../post/Post';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';
import TabMeta from './TabMeta';

type Props = {
  posts: TPost[];
  upvoteDownvotePost: ReturnType<typeof useUpvoteDownvotePostMutation>[0];
  deletePost: ReturnType<typeof useDeletePostMutation>[0];
  markdown: (text: string) => JSX.Element;
  currentUser?: User;
  profileUser?: User;
  reportPost?: ReportEntityMutationHookResult[0];
  fetch: (limit: number, offset: number) => Promise<TPost[]>;
  isInProfileUpvotes?: boolean;
};

export const Posts: React.FC<Props> = ({
  posts,
  markdown,
  upvoteDownvotePost,
  currentUser,
  deletePost,
  reportPost,
  fetch,
  isInProfileUpvotes,
  profileUser,
}) => {
  console.log(isInProfileUpvotes);
  return (
    <div className="mt-8 bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]">
      <TabMeta
        title={
          isInProfileUpvotes
            ? `${profileUser?.name}'s Upvotes`
            : `${profileUser?.name}'s Posts`
        }
        description={
          posts.length <= 0
            ? isInProfileUpvotes
              ? `@${profileUser?.username} has not upvoted any posts.`
              : `@${profileUser?.username} has no posts.`
            : ''
        }
      />
      <InfiniteScrollWrapper
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
              upvotePost={() => {
                upvoteDownvotePost({
                  variables: {
                    downvote: false,
                    upvote: true,
                    postId: post.id,
                  },
                });
                // window.location.reload();
              }}
              downvotePost={() => {
                upvoteDownvotePost({
                  variables: {
                    downvote: true,
                    upvote: false,
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
    </div>
  );
};
