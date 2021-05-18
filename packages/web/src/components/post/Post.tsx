import React from 'react';
import { Comments, SmallUpArrow, SmallDownArrow } from '@icons/index';
import StyledMarkdown from '@components/markdown/StyledMarkdown';

interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  author: Author;
  createdAt: string;
  likes: number;
  dislikes: number;
  lastEdited?: string;
  message: string;
  resort?: any;
  title: string;
  topics?: Array<string>;
}

interface Props {
  post: Post;
}

export const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className="shadow-lg max-w-[580px] w-full bg-gray-800 px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between">
      <div>
        <header className="flex items-center space-x-4">
          <img
            src={post.author.avatar}
            className="flex-none bg-gray-600 rounded-full w-11 h-11"
          />
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-xl font-bold">{post.author.name}</p>
              <p className="-mt-1 text-light font-bold">
                @{post.author.username}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <SmallUpArrow />
              <p className="font-bold bg-gray-700 px-2 rounded-full">
                {post.likes - post.dislikes}
              </p>
              <SmallDownArrow />
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
          <p className="text-sm">12 replies</p>
          <Comments />
        </div>
      </footer>
    </div>
  );
};
