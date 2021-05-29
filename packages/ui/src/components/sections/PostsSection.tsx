import React from 'react';

import { Post } from '../post/Post';
import { CreatePostInput } from '../home/CreatePostInput';
import { DeletePostMutationHookResult } from '@oasis-sh/client-gql';

type DeleteMutation = DeletePostMutationHookResult[0];

interface Props {
  createPost: (variables: object) => void;
  likeDislikePost: (variable: object) => void;
  user: any;
  posts: any;
  StyledMarkdown: any;
  deleteMutation: DeleteMutation;
}
export const PostsSection: React.FC<Props> = ({
  createPost,
  likeDislikePost,
  user,
  posts,
  StyledMarkdown,
  deleteMutation,
}) => {
  return (
    <>
      {user && (
        <CreatePostInput
          avatarUrl={user.avatar}
          onSubmit={(value: string) =>
            createPost({ variables: { message: value, topics: [] } })
          }
        />
      )}
      {[...posts].reverse().map((post: any, index: number) => (
        <Post
          post={post}
          key={index}
          markdown={(text) => {
            return <StyledMarkdown text={text} isPost={true} />;
          }}
          likePost={() => {
            likeDislikePost({
              variables: {
                postId: post.id,
                dislike: false,
                like: true,
              },
            });
          }}
          dislikePost={() => {
            likeDislikePost({
              variables: {
                postId: post.id,
                dislike: true,
                like: false,
              },
            });
          }}
          currentUser={user}
          deletePost={(id) => {
            deleteMutation
              ? deleteMutation({
                  variables: {
                    postId: id,
                  },
                })
              : () => {};
            window.location.reload();
          }}
        />
      ))}
    </>
  );
};
