import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '../post/Post';
import { CreatePostInput } from '../home/CreatePostInput';
import { DeletePostMutationHookResult } from '@oasis-sh/react-gql';

type DeleteMutation = DeletePostMutationHookResult[0];

interface Props {
  createPost: (variables: object) => void;
  likeDislikePost: (variable: object) => void;
  user: any;
  posts: any;
  timezone: string;
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
  timezone,
  StyledMarkdown,
  deleteMutation,
  fetch,
  amountPerFetch,
}) => {
  const [items, setItems] = useState<any>(posts);
  const limit = amountPerFetch;
  const [offset, setOffset] = useState<number>(posts.length);
  const [hasMore, setHasMore] = useState(true);
  return (
    <>
      {user && (
        <CreatePostInput
          avatarUrl={user.avatar}
          onSubmit={(value: string) => {
            createPost({ variables: { message: value, topics: [] } });
            window.location.reload();
          }}
        />
      )}
      <InfiniteScroll
        dataLength={items.length}
        next={async () => {
          const newData = await fetch(limit, offset);
          if (newData.length === 0) {
            setHasMore(false);
          } else {
            setItems([...items, ...newData]);
            setOffset(offset + limit);
          }
        }}
        hasMore={hasMore}
        loader={null}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((post: any, index: number) => (
          <div className="mb-6" key={index}>
            <Post
              post={post}
              timezone={timezone}
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
        ))}
      </InfiniteScroll>
    </>
  );
};
