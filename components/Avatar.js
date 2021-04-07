import { PersonIcon } from '@primer/octicons-react';
import React from 'react';

export default function Avatar(allProps) {
  const { user, size, ...props } = { ...allProps };
  const [showImg, setShowImg] = React.useState(true);

  switch (size) {
    case 'lg':
      return (
        <div
          {...props}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl md:w-32 md:h-32 md:rounded-3xl bg-gray-600 shadow-md overflow-hidden ${props.className} flex items-center justify-center`}
        >
          <PersonIcon className={`color-current text-white`} size="large" />
          {showImg ? (
            <img
              className={`absolute z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-xl md:w-32 md:h-32 md:rounded-3xl ${props.className}`}
              src={user.avatar}
              onError={e => {
                setShowImg(false);
              }}
            />
          ) : null}
        </div>
      );
    case 'sm':
      return (
        <div
          {...props}
          className={`mx-4 w-8 h-8 bg-gray-600 shadow-md rounded-lg overflow-hidden ${props.className} flex items-center justify-center`}
        >
          <PersonIcon className={`color-current text-white`} size="small" />
          {showImg ? (
            <img
              className={`absolute z-10 w-8 h-8 rounded-lg`}
              src={user.avatar}
              onError={e => {
                setShowImg(false);
              }}
            />
          ) : null}
        </div>
      );
    default:
      return (
        <div
          {...props}
          className={`mx-4 w-8 h-8 bg-gray-600 shadow-md rounded-lg overflow-hidden ${props.className} flex items-center justify-center`}
        >
          <PersonIcon className={`color-current text-white`} size="small" />
          {showImg ? (
            <img
              className={`absolute z-10 w-8 h-8 rounded-lg`}
              src={user.avatar}
              onError={e => {
                setShowImg(false);
              }}
            />
          ) : null}
        </div>
      );
  }
}
