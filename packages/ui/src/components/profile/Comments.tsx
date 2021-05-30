// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  GetUsersCommentsQuery,
  Comment as TComment,
  User,
  useLikeDislikeCommentMutation,
} from '@oasis-sh/client-gql';
import React from 'react';
import Comment from '../comment/Comment';

type UsersCommentType = GetUsersCommentsQuery['userOnlyComments'];

type Props = {
  comments: UsersCommentType | undefined | null;
  likeDislikeComment: ReturnType<typeof useLikeDislikeCommentMutation>[0];
  // deletePost: ReturnType<typeof use>[0];
  markdown: (text: string) => JSX.Element;
  currentUser?: User;
};

export const Comments: React.FC<Props> = ({
  comments,
  markdown,
  likeDislikeComment,
  currentUser,
}) => {
  return (
    <>
      <div
        className={`mt-8 bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]`}
      >
        {comments?.comments.items.map((comment, index) => (
          <div key={index} className="mb-6">
            <Comment
              comment={comment as TComment}
              currentUser={currentUser}
              markdown={markdown}
              bgColorOveride="bg-gray-900"
              likeComment={() => {
                likeDislikeComment({
                  variables: {
                    commentId: comment.id,
                    dislike: false,
                    like: true,
                  },
                });
                window.location.reload();
              }}
              dislikeComment={() => {
                likeDislikeComment({
                  variables: {
                    commentId: comment.id,
                    dislike: true,
                    like: false,
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
