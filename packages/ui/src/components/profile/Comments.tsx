// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  Comment as TComment,
  User,
  ReportEntityMutationHookResult,
  useUpvoteDownvoteCommentMutation,
} from '@oasis-sh/react-gql';
import React from 'react';
import Comment from '../comment/Comment';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';
import TabMeta from './TabMeta';

type Props = {
  comments: TComment[];
  upvoteDownvoteComment: ReturnType<typeof useUpvoteDownvoteCommentMutation>[0];
  // deleteComment: ReturnType<typeof useDeletePostMutation>[0];
  markdown: (text: string) => JSX.Element;
  currentUser?: User;
  profileUser?: User;
  reportComment?: ReportEntityMutationHookResult[0];
  fetch: (limit: number, offset: number) => Promise<TComment[]>;
  bgColorOveride?: string;
  showName?: boolean;
};

export const Comments: React.FC<Props> = ({
  comments,
  markdown,
  upvoteDownvoteComment,
  currentUser,
  reportComment,
  fetch,
  bgColorOveride,
  profileUser,
  showName = true,
}) => {
  return (
    <div className="mt-8 bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]">
      {showName && (
        <TabMeta
          title={`${profileUser?.name}'s Comments`}
          description={
            comments.length <= 0
              ? `@${profileUser?.username} does not have any comments.`
              : ''
          }
        />
      )}
      <InfiniteScrollWrapper
        amountPerFetch={10}
        defaultItems={comments}
        fetch={fetch}
        renderComponent={(comment, index) => (
          <div key={index} className="mb-6">
            <Comment
              comment={comment as TComment}
              currentUser={currentUser}
              // deletePost={(id) => {
              //   deletePost({
              //     variables: { postId: id },
              //   });
              //   window.location.reload();
              // }}
              markdown={markdown}
              bgColorOveride={bgColorOveride ?? 'bg-gray-900'}
              upvoteComment={() => {
                upvoteDownvoteComment({
                  variables: {
                    downvote: false,
                    upvote: true,
                    commentId: comment.id,
                  },
                });
                // window.location.reload();
              }}
              downvoteComment={() => {
                upvoteDownvoteComment({
                  variables: {
                    downvote: true,
                    upvote: false,
                    commentId: comment.id,
                  },
                });
                // window.location.reload();
              }}
              reportComment={reportComment}
            />
          </div>
        )}
      />
    </div>
  );
};
