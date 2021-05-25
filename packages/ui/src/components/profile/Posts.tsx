// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  GetUsersLikedPostsQuery,
  GetUsersPostsQuery,
  Post as TPost,
  useLikeDislikePostMutation,
} from '@oasis-sh/client-gql';
import React from 'react';
import Post from '../post/Post';

type UsersPostType = GetUsersPostsQuery['userOnlyPosts'];
type UsersLikedPostType = GetUsersLikedPostsQuery['getUserByName'];

type Props = {
  posts: UsersPostType | undefined | null;
  likedPosts: UsersLikedPostType | undefined | null;
  likeDislikePost: ReturnType<typeof useLikeDislikePostMutation>[0];
  markdown: (text: string) => JSX.Element;
};

export const Posts: React.FC<Props> = ({
  posts,
  likedPosts,
  markdown,
  likeDislikePost,
}) => {
  return (
    <>
      <div className={`mt-8 bg-gray-800 rounded-xl py-6 px-6`}>
        {(posts
          ? posts.posts
          : likedPosts
          ? likedPosts.likedPosts
          : null
        )?.items.map((post, index) => (
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
