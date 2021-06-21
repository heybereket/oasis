import React, { useRef, useState } from 'react';
import { DropdownItem } from '../navbar/DropdownItem';
import {
  Comment as TComment,
  ReportType,
  Role,
  User,
  ReportEntityMutationHookResult,
} from '@oasis-sh/react-gql';
import { formatDate, formatNumber } from '@oasis-sh/shared';
import { ThreeDots } from '../../icons/other/ThreeDots';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { Info, Trash, SmallDownArrow, SmallUpArrow } from '../../icons';
import { Modal } from '../..';
import { CustomLink } from '../../providers/CustomLink';

interface Props {
  comment: TComment;
  currentUser?: User;
  upvoteComment?: () => any;
  downvoteComment?: () => any;
  deleteComment?: (id: string) => any;
  markdown: (text: string) => JSX.Element;
  bgColorOveride?: string;
  reportComment?: ReportEntityMutationHookResult[0];
}

enum UpvoteDownvoteState {
  'LIKED',
  'NONE',
  'DISLIKED',
}

export const Comment: React.FC<Props> = ({
  comment: commentData,
  upvoteComment,
  downvoteComment,
  markdown,
  bgColorOveride,
  deleteComment,
  currentUser,
  reportComment,
}) => {
  const date = formatDate(commentData.createdAt);

  const [upvotes, setUpvotes] = useState(commentData.upvotes);
  const [downvotes, setDownvotes] = useState(commentData.downvotes);
  const formattedVotes = formatNumber(upvotes - downvotes);

  const [upvoteState, setUpvoteState] = useState<UpvoteDownvoteState>(
    commentData.isUpvoted
      ? UpvoteDownvoteState.LIKED
      : commentData.isDownvoted
      ? UpvoteDownvoteState.DISLIKED
      : UpvoteDownvoteState.NONE
  );

  const [isDropdownActive, setDropdownActive] = useState(false);
  const node = useRef(null);
  useOnClickOutside(node, () => setDropdownActive(false));
  const [isReportOpen, setReportOpen] = useState(false);

  const [reportType, setReportType] = useState<ReportType>();
  const [reportInfo, setReportInfo] = useState('');

  return (
    <>
      <div
        className={`w-full ${
          bgColorOveride ?? 'bg-gray-800'
        } px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between`}
      >
        <div>
          <header className="flex items-center space-x-4">
            <CustomLink
              className="w-11 h-11 flex-none"
              href={`/u/${commentData.author.username}`}
            >
              <img
                src={commentData.author.avatar}
                alt="avatar"
                loading="lazy"
                className="flex-none bg-gray-600 rounded-full w-11 h-11"
              />
            </CustomLink>
            <div className="flex items-center justify-between w-full">
              <CustomLink href={`/u/${commentData.author.username}`}>
                <div>
                  <p className="text-xl font-bold">{commentData.author.name}</p>
                  <p className="-mt-1 text-light font-bold">
                    @{commentData.author.username}
                  </p>
                </div>
              </CustomLink>
              <div className="flex flex-row">
                <div className="flex flex-col items-center">
                  <SmallUpArrow
                    onClick={() => {
                      if (upvoteComment) upvoteComment();
                      console.log(upvoteState);
                      if (upvoteState === UpvoteDownvoteState.LIKED) {
                        setUpvoteState(UpvoteDownvoteState.NONE);
                        setUpvotes(upvotes - 1);
                      } else if (upvoteState === UpvoteDownvoteState.DISLIKED) {
                        setUpvoteState(UpvoteDownvoteState.LIKED);
                        setDownvotes(downvotes - 1);
                        setUpvotes(upvotes + 1);
                      } else {
                        setUpvoteState(UpvoteDownvoteState.LIKED);
                        setUpvotes(upvotes + 1);
                      }
                      console.log(upvoteState);
                    }}
                    className={`cursor-pointer ${
                      upvoteState === UpvoteDownvoteState.LIKED
                        ? 'text-blue-400'
                        : ''
                    }`}
                  />
                  <p className="font-bold bg-gray-700 px-2 rounded-full">
                    {formattedVotes}
                  </p>
                  <SmallDownArrow
                    onClick={() => {
                      if (downvoteComment) downvoteComment();
                      if (upvoteState === UpvoteDownvoteState.DISLIKED) {
                        setUpvoteState(UpvoteDownvoteState.NONE);
                        setDownvotes(downvotes - 1);
                      } else if (upvoteState === UpvoteDownvoteState.LIKED) {
                        setUpvoteState(UpvoteDownvoteState.DISLIKED);
                        setDownvotes(downvotes + 1);
                        setUpvotes(upvotes - 1);
                      } else {
                        setUpvoteState(UpvoteDownvoteState.DISLIKED);
                        setDownvotes(downvotes + 1);
                      }
                    }}
                    className={`cursor-pointer ${
                      upvoteState === UpvoteDownvoteState.DISLIKED
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
                          currentUser?.id === commentData.author.id) && (
                          <div className="flex flex-col justify-start items-start text-base text-gray-300 mb-2">
                            <DropdownItem
                              name="Delete"
                              icon={Trash}
                              onClick={() =>
                                deleteComment
                                  ? deleteComment(commentData.id ?? '')
                                  : () => {}
                              }
                            />
                          </div>
                        )}
                        <div className="flex flex-col justify-start items-start text-base text-gray-300 mb-2">
                          <DropdownItem
                            name="Report"
                            icon={Info}
                            onClick={() => {
                              setDropdownActive(false);
                              setReportOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="font-medium mt-2 mb-6 text-xl break-words">
            {markdown(commentData?.content ?? '')}
          </div>
        </div>
        <CustomLink href={'/comment/' + commentData.id}>
          <footer className="flex justify-between">
            <p className="text-sm font-medium">{date}</p>
          </footer>
        </CustomLink>
      </div>
      <Modal
        closeHandler={() => {
          setReportOpen(false);
        }}
        open={isReportOpen}
        className="w-1/2"
      >
        <form
          className="w-3/4 mx-auto mt-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (reportComment) {
              reportComment({
                variables: {
                  reportData: {
                    type: reportType ?? ReportType.InappropriateContent,
                    information: reportInfo,
                  },
                  reporteeData: {
                    commentId: commentData.id,
                  },
                },
              });

              setReportOpen(false);
            }
          }}
        >
          <select
            className="text-gray-700 block w-full mb-4"
            value={reportType}
            onChange={(e) => {
              setReportType(e.currentTarget.value as ReportType);
            }}
          >
            <option value={''}>--Please Select a Type--</option>
            {Object.keys(ReportType).map((val, index) => (
              <option key={index} value={val} className="text-gray-700">
                {val}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Reason for report"
            className="text-gray-700 block w-full"
            value={reportInfo}
            onChange={(e) => {
              setReportInfo(e.target.value);
            }}
          />
          <button type="submit">Submit Report</button>
        </form>
      </Modal>
    </>
  );
};

export default Comment;
