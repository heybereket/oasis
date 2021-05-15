import { Button } from '@components/common/Button';
import { RightArrow } from '@components/icons';
import React from 'react';
import AvatarGroup from './AvatarGroup';

interface IResortHeaderProps {
  resortCategory: string;
  resortDescription: string;
  resortLogo: string;
  avatarIcons: string[];
  resortBanner: string;
  resortName: string;
}

const ResortHeader: React.FC<IResortHeaderProps> = (props) => {
  return (
    <div
      className="max-w-7xl rounded-2xl h-48 background-cover flex-grow flex px-16 items-center font-sans"
      style={{
        background: `linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.resortBanner})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="uppercase font-mono text-xs font-bold tracking-widest text-gray-500">
            RESORTS /{' '}
            <span className="text-gray-200">
              {props.resortCategory.toUpperCase()}
            </span>
          </span>
          <h2 className="font-extrabold">{props.resortName}</h2>
          <p className="text-gray-300 text-lg">{props.resortDescription}</p>
          <div className="flex items-center space-x-3 mt-2">
            <AvatarGroup avatarIcons={props.avatarIcons} />
            <Button
              className="flex items-center justify-center space-x-1"
              size="xs"
              color="gray"
            >
              <div className="text-sm">Follow</div>
              <RightArrow height="1.25rem" width="1.25rem" />
            </Button>
          </div>
        </div>
        <div>
          <img
            className="w-24 h-24 object-cover rounded"
            src={props.resortLogo}
            alt="resort logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ResortHeader;
