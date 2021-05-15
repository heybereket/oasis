import { Button } from '@components/common/Button';
import { RightArrow } from '@components/icons';
import React from 'react';
import AvatarGroup from './AvatarGroup';

const ResortHeader: React.FC = () => {
  return (
    <div
      className="max-w-7xl rounded-2xl h-48 background-cover flex-grow flex px-16 items-center font-sans"
      style={{
        background: `linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://resi.ze-robot.com/dl/ul/ultraviolet-4k-wallpaper-2560%C3%971600.jpg)`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="uppercase font-mono text-xs font-bold tracking-widest text-gray-500">
            RESORTS / <span className="text-gray-200">PROGRAMMING</span>
          </span>
          <h2 className="font-extrabold">TypeScript</h2>
          <p className="text-gray-300 text-lg">
            Have TS questions? Learn’t something new? Share it here!
          </p>
          <div className="flex items-center space-x-3 mt-2">
            <AvatarGroup />
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
            src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"
            alt="resort logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ResortHeader;
