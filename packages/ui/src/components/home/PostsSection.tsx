import React from 'react';
import { Post } from '../post/Post';
import { CreatePostInput } from '../home/CreatePostInput';
import { DeletePostMutationHookResult } from '@oasis-sh/react-gql';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';

type DeleteMutation = DeletePostMutationHookResult[0];

interface Props {
  createPost: (variables: object) => void;
  likeDislikePost: (variable: object) => void;
  user: any;
  posts: any;
  StyledMarkdown: any;
  deleteMutation: DeleteMutation;
  fetch: (limit: number, offset: number) => Promise<any>;
  amountPerFetch: number;
}
export const PostsSection: React.FC<Props> = ({
  createPost,
  likeDislikePost,
  user,
  posts,
  StyledMarkdown,
  deleteMutation,
  fetch,
  amountPerFetch,
}) => {
  return (
    <>
      {user && (
        <CreatePostInput
          avatarUrl={user.avatar}
          onSubmit={(value: string) => {
            createPost({ variables: { message: value, topics: [] } });
            // window.location.reload();
          }}
        />
      )}
      <InfiniteScrollWrapper
        fetch={fetch}
        amountPerFetch={amountPerFetch}
        defaultItems={posts}
        renderComponent={(post, index) => (
          <div className="mb-6" key={index}>
            <Post
              post={post}
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
                deleteMutation({
                  variables: {
                    postId: id,
                  },
                });
                window.location.reload();
              }}
            />
          </div>
        )}
      />
    </>
  );
};
