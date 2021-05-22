import React, { useState } from "react";
import { Comments, SmallUpArrow, SmallDownArrow } from "../../index";
// import Link from "next/link";
import { Post as TPost } from "@oasis-sh/client-gql";
import { postDate } from "../../lib/postDate";
// import { StyledMarkdown } from "../../../../web/src/components/markdown/styledMarkdown";

interface Props {
  post: TPost;
  likePost?: () => any;
  dislikePost?: () => any;
  markdown: (text: string) => JSX.Element;
}

enum LikeDislikeState {
  "LIKED",
  "NONE",
  "DISLIKED",
}

export const Post: React.FC<Props> = ({
  post: postData,
  likePost,
  dislikePost,
  markdown,
}) => {
  const date = postDate(postData.createdAt);

  const [likes, setLikes] = useState(postData.likes);
  const [dislikes, setDislikes] = useState(postData.dislikes);

  const [likeState, setLikeState] = useState<LikeDislikeState>(
    postData.isLiked
      ? LikeDislikeState.LIKED
      : postData.isDisliked
      ? LikeDislikeState.DISLIKED
      : LikeDislikeState.NONE
  );

  return (
    <div className="shadow-lg max-w-580 w-full bg-gray-800 px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between">
      <div>
        <header className="flex items-center space-x-4">
          <a href={`/user/${postData.author.username}`}>
            <a className="w-11 h-11 flex-none">
              <img
                src={postData.author.avatar}
                className="flex-none bg-gray-600 rounded-full w-11 h-11"
              />
            </a>
          </a>
          <div className="flex items-center justify-between w-full">
            <a href={`/user/${postData.author.username}`}>
              <a>
                <div>
                  <p className="text-xl font-bold">{postData.author.name}</p>
                  <p className="-mt-1 text-light font-bold">
                    @{postData.author.username}
                  </p>
                </div>
              </a>
            </a>
            <div className="flex flex-col items-center">
              <SmallUpArrow
                onClick={() => {
                  likePost
                    ? likePost()
                    : () => {
                        return;
                      };
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
                  likeState === LikeDislikeState.LIKED ? "text-blue-400" : ""
                }`}
              />
              <p className="font-bold bg-gray-700 px-2 rounded-full">
                {likes - dislikes}
              </p>
              <SmallDownArrow
                onClick={() => {
                  dislikePost
                    ? dislikePost()
                    : () => {
                        return;
                      };
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
                  likeState === LikeDislikeState.DISLIKED ? "text-blue-400" : ""
                }`}
              />
            </div>
          </div>
        </header>
        <p className="font-medium mt-2 mb-6 text-xl break-words">
          {markdown(postData?.message ?? "")}
          {/* <StyledMarkdown text={postData.message} isPost={true} /> */}
        </p>
      </div>
      <footer className="flex justify-between">
        <p className="text-sm font-semibold">{date}</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm">{postData.comments.total} replies</p>
          <Comments />
        </div>
      </footer>
    </div>
  );
};

export default Post;
