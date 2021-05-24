// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  GetUsersPostsQuery,
  Post as TPost,
  useLikeDislikePostMutation,
} from '@oasis-sh/client-gql';
import React from 'react';
import Post from '../post/Post';

type PostType = GetUsersPostsQuery['userOnlyPosts'];

type Props = {
  posts: PostType | undefined | null;
  likeDislikePost: ReturnType<typeof useLikeDislikePostMutation>[0];
  markdown: (text: string) => JSX.Element;
};

export const Posts: React.FC<Props> = ({
  posts,
  markdown,
  likeDislikePost,
}) => {
  return (
    <>
      <div className={`mt-8 bg-gray-800 rounded-xl py-6 px-6`}>
        {posts?.posts.items.map((post, index) => (
          <div key={index} className="mb-6">
            <Post
              post={post as TPost}
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
                window.location.reload();
              }}
              dislikePost={() => {
                likeDislikePost({
                  variables: {
                    dislike: true,
                    like: false,
                    postId: post.id,
                  },
                });
                window.location.reload();
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
