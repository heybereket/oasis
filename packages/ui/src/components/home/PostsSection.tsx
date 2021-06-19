import React from 'react';
import { Post } from '../post/Post';
import { CreatePostInput } from '../home/CreatePostInput';
import {
  DeletePostMutationHookResult,
  ReportEntityMutationHookResult,
} from '@oasis-sh/react-gql';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';

type DeleteMutation = DeletePostMutationHookResult[0];

interface Props {
  createPost: (variables: object) => void;
  upvoteDownvotePost: (variable: object) => void;
  user: any;
  posts: any;
  StyledMarkdown: any;
  deleteMutation: DeleteMutation;
  fetch: (limit: number, offset: number) => Promise<any>;
  amountPerFetch: number;
  reportPost?: ReportEntityMutationHookResult[0];
}

export const PostsSection: React.FC<Props> = ({
  createPost,
  upvoteDownvotePost,
  user,
  posts,
  StyledMarkdown,
  deleteMutation,
  fetch,
  amountPerFetch,
  reportPost,
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
              upvotePost={() => {
                upvoteDownvotePost({
                  variables: {
                    postId: post.id,
                    downvote: false,
                    upvote: true,
                  },
                });
              }}
              downvotePost={() => {
                upvoteDownvotePost({
                  variables: {
                    postId: post.id,
                    downvote: true,
                    upvote: false,
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
              reportPost={reportPost}
            />
          </div>
        )}
      />
    </>
  );
};
