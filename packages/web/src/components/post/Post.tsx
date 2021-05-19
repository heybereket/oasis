import React, { useState } from 'react';
import { Comments, SmallUpArrow, SmallDownArrow } from '@icons/index';
import Link from 'next/link';
import {
  PaginatePostsQuery,
  useLikeDislikePostMutation,
} from '@oasis/client-gql';

type PostType = PaginatePostsQuery['paginatePosts'][0];

interface Props {
  post: PostType;
}

enum LikeDislikeState {
  'LIKED',
  'NONE',
  'DISLIKED',
}

export const Post: React.FC<Props> = ({ post }) => {
  const [likePost] = useLikeDislikePostMutation({
    variables: {
      like: true,
      dislike: false,
      postId: post.id,
    },
  });
  const [dislikePost] = useLikeDislikePostMutation({
    variables: {
      like: false,
      dislike: true,
      postId: post.id,
    },
  });

  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  const [likeState, setLikeState] = useState<LikeDislikeState>(
    post.isLiked
      ? LikeDislikeState.LIKED
      : post.isDisliked
      ? LikeDislikeState.DISLIKED
      : LikeDislikeState.NONE
  );

  return (
    <div className="shadow-lg max-w-580 w-full bg-gray-800 px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between">
      <div>
        <header className="flex items-center space-x-4">
          <img
            src={post.author.avatar}
            className="flex-none bg-gray-600 rounded-full w-11 h-11"
          />
          <div className="flex items-center justify-between w-full">
            <Link href={`/user/${post.author.username}`}>
              <a>
                <div>
                  <p className="text-xl font-bold">{post.author.name}</p>
                  <p className="-mt-1 text-light font-bold">
                    @{post.author.username}
                  </p>
                </div>
              </a>
            </Link>
            <div className="flex flex-col items-center">
              <SmallUpArrow
                onClick={() => {
                  likePost();
                  if (likeState === LikeDislikeState.LIKED) {
                    setLikeState(LikeDislikeState.NONE);
                    setLikes(likes - 1);
                  } else if (likeState === LikeDislikeState.DISLIKED) {
                    setLikeState(LikeDislikeState.LIKED);
                    setDislikes(dislikes - 1);
                    setLikes(likes + 1);
                  } else {
                    setLikeState(LikeDislikeState.LIKED);
                    setLikes(likes + 1);
                  }
                }}
                className={`cursor-pointer ${
                  likeState === LikeDislikeState.LIKED ? 'text-blue-400' : ''
                }`}
              />
              <p className="font-bold bg-gray-700 px-2 rounded-full">
                {likes - dislikes}
              </p>
              <SmallDownArrow
                onClick={() => {
                  dislikePost();
                  if (likeState === LikeDislikeState.DISLIKED) {
                    setLikeState(LikeDislikeState.NONE);
                    setDislikes(dislikes - 1);
                  } else if (likeState === LikeDislikeState.LIKED) {
                    setLikeState(LikeDislikeState.DISLIKED);
                    setDislikes(dislikes + 1);
                    setLikes(likes - 1);
                  } else {
                    setLikeState(LikeDislikeState.DISLIKED);
                    setDislikes(dislikes + 1);
                  }
                }}
                className={`cursor-pointer ${
                  likeState === LikeDislikeState.DISLIKED ? 'text-blue-400' : ''
                }`}
              />
            </div>
          </div>
        </header>
        <p className="font-medium mt-2 mb-6 text-xl break-words">
          {post.message}
        </p>
      </div>
      <footer className="flex justify-between">
        <p className="text-sm font-bold">9:44PM • May 17th 2021</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm">{post.comments.total} replies</p>
          <Comments />
        </div>
      </footer>
    </div>
  );
};
