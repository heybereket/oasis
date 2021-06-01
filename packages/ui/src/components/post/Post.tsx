import React, { useRef, useState } from 'react';
import { DropdownItem } from '../navbar/DropdownItem';
import { Post as TPost, Role, User } from '@oasis-sh/client-gql';
import { formatDate, formatNumber } from '../../lib/format';
import { ThreeDots } from '../../icons/other/ThreeDots';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside';
import { Info, Trash, SmallDownArrow, SmallUpArrow, Comments } from '../../icons';

interface Props {
  post: TPost;
  currentUser?: User;
  likePost?: () => any;
  dislikePost?: () => any;
  deletePost?: (id: string) => any;
  markdown: (text: string) => JSX.Element;
  bgColorOveride?: string;
}

enum LikeDislikeState {
  'LIKED',
  'NONE',
  'DISLIKED',
}

export const Post: React.FC<Props> = ({
  post: postData,
  likePost,
  dislikePost,
  markdown,
  bgColorOveride,
  deletePost,
  currentUser,
}) => {
  const date = formatDate(postData.createdAt);

  const [likes, setLikes] = useState(postData.likes);
  const [dislikes, setDislikes] = useState(postData.dislikes);

  const [likeState, setLikeState] = useState<LikeDislikeState>(
    postData.isLiked
      ? LikeDislikeState.LIKED
      : postData.isDisliked
      ? LikeDislikeState.DISLIKED
      : LikeDislikeState.NONE
  );

  const [isDropdownActive, setDropdownActive] = useState(false);
  const node = useRef(null);
  useOnClickOutside(node, () => setDropdownActive(false));

  return (
    <div
      className={`shadow-lg w-full ${
        bgColorOveride ?? 'bg-gray-800'
      } px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between`}
    >
      <div>
        <header className="flex items-center space-x-4">
          <a
            className="w-11 h-11 flex-none"
            href={`/user/${postData.author.username}`}
          >
            <img
              src={postData.author.avatar}
              alt="avatar"
              loading="lazy"
              className="flex-none bg-gray-600 rounded-full w-11 h-11"
            />
          </a>
          <div className="flex items-center justify-between w-full">
            <a href={`/user/${postData.author.username}`}>
              <div>
                <p className="text-xl font-bold">{postData.author.name}</p>
                <p className="-mt-1 text-light font-bold">
                  @{postData.author.username}
                </p>
              </div>
            </a>
            <div className="flex flex-row">
              <div className="flex flex-col items-center">
                <SmallUpArrow
                  onClick={() => {
                    likePost ? likePost() : () => {};
                    console.log(likeState);
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
                    console.log(likeState);
                  }}
                  className={`cursor-pointer ${
                    likeState === LikeDislikeState.LIKED ? 'text-blue-400' : ''
                  }`}
                />
                <p className="font-bold bg-gray-700 px-2 rounded-full">
                  {Number(formatNumber(likes)) - Number(formatNumber(dislikes))}
                </p>
                <SmallDownArrow
                  onClick={() => {
                    dislikePost ? dislikePost() : () => {};
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
                    likeState === LikeDislikeState.DISLIKED
                      ? 'text-blue-400'
                      : ''
                  }`}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <ThreeDots
                  className="mx-2 cursor-pointer"
                  onClick={() => setDropdownActive(true)}
                />
                <div className="flex relative">
                  {/* fixed the rendering logic here */}
                  {isDropdownActive && (
                    <div
                      className={`flex absolute flex-col rounded-lg bg-gray-700 px-4 py-3 max-w-md z-50 right-0 mt-7  ${
                        isDropdownActive
                          ? 'animate-fade-in-down'
                          : 'animate-fade-out-up animate-fill-forwards'
                      }`}
                      ref={node}
                    >
                      {(currentUser?.roles?.includes(Role.Moderator) ||
                        currentUser?.id === postData.author.id) && (
                        <div className="flex flex-col justify-start items-start text-base text-gray-300 mb-2">
                          <DropdownItem
                            name="Delete"
                            icon={Trash}
                            onClick={() =>
                              deletePost
                                ? deletePost(postData.id ?? '')
                                : () => {}
                            }
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-start items-start text-base text-gray-300 mb-2">
                        <DropdownItem
                          name="Report"
                          icon={Info}
                          onClick={() => {}}
                        />
                      </div>
                      {/* <div className="flex flex-col justify-start items-start text-base text-gray-300 mt-3">
                        <DropdownItem
                          name="Logout"
                          icon={LogoutIcon}
                          onClick={async () => {
                            await logout();
                          }}
                        />
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="font-medium mt-2 mb-6 text-xl break-words">
          {markdown(postData?.message ?? '')}
          {/* <StyledMarkdown text={postData.message} isPost={true} /> */}
        </div>
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
