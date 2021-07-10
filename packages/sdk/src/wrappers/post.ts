/* eslint-disable no-invalid-this */
import type { Client } from '../generated/client';
import type { EditPostInput, Post } from '../generated/types';

export type PostWrapperFunctions = {
  delete(): Promise<boolean>;
  edit(data: EditPostInput): Promise<boolean>;
  upvote(): Promise<boolean>;
  downvote(): Promise<boolean>;
};

export type WrappedPost = Post & PostWrapperFunctions;

export function wrapPost(post: Post, client: Client): WrappedPost {
  const obj = { ...post };

  const method = <T extends keyof PostWrapperFunctions>(
    name: T,
    func: PostWrapperFunctions[T]
  ) => {
    Reflect.defineProperty(obj, name, {
      value: func,
      enumerable: false,
    });
  };

  method('delete', () =>
    client.fetchGraphQL(
      'mutation($id: String!) { deletePost(postId: $id) }',
      (data) => data.deletePost,
      { id: post.id }
    )
  );

  method('edit', (data) =>
    client.fetchGraphQL(
      'mutation($id: String!, $data: EditPostInput!) { editPost(postId: $id, data: $data) }',
      (data) => data.deletePost,
      { id: post.id, data }
    )
  );

  method('upvote', () =>
    client.fetchGraphQL(
      'mutation($id: String!) { upvotePost(postId: $id) }',
      (data) => data.upvotePost,
      { id: post.id }
    )
  );

  method('downvote', () =>
    client.fetchGraphQL(
      'mutation($id: String!) { downvotePost(postId: $id) }',
      (data) => data.downvotePost,
      { id: post.id }
    )
  );

  return obj as any;
}
