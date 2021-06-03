import { Button } from '../shared/Button';
import { RightArrow } from '../../icons';
import { GetResortByNameWithMembersQuery } from '@oasis-sh/react-gql';
import React from 'react';
import AvatarGroup from './AvatarGroup';

type dataType = GetResortByNameWithMembersQuery['getResortByName'];

interface IResortHeaderProps {
  resortData: dataType;
  joinResort: () => any;
}

export const ResortHeader: React.FC<IResortHeaderProps> = ({
  resortData,
  joinResort,
}) => {
  return (
    <div
      className="max-w-7xl rounded-2xl h-48 background-cover flex-grow flex px-16 items-center font-sans"
      style={{
        background: `linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${
          resortData?.banner ?? ''
        })`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="uppercase font-mono text-xs font-bold tracking-widest text-gray-500">
            RESORTS /{' '}
            <span className="text-gray-200">
              {resortData?.category.toUpperCase()}
            </span>
          </span>
          <h2 className="font-extrabold">{resortData?.name ?? ''}</h2>
          <p className="text-gray-300 text-lg">
            {resortData?.description ?? ''}
          </p>
          <div className="flex items-center space-x-3 mt-2">
            <AvatarGroup
              avatarIcons={
                resortData?.members.items.map((member) => member.avatar) ?? []
              }
            />
            <Button
              className="flex items-center justify-center space-x-1"
              size="xs"
              color="gray"
              onClick={(_) => {
                if (!resortData?.isJoined) {
                  joinResort();
                  window.location.reload();
                }
              }}
            >
              {!resortData?.isJoined ? (
                <>
                  <div className="text-sm">Follow</div>
                  <RightArrow height="1.25rem" width="1.25rem" />
                </>
              ) : (
                <div className="text-sm">Following</div>
              )}
            </Button>
          </div>
        </div>
        <div>
          <img
            className="w-24 h-24 object-cover rounded"
            src={resortData?.logo ?? ''}
            alt="resort logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ResortHeader;
