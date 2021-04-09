import { PersonIcon } from '@primer/octicons-react';
import React from 'react';

export default function Avatar(allProps) {
  const { user, size, ...props } = { ...allProps };
  const [isError, setIsError] = React.useState(false);
  var sizeClasses;

  switch (size) {
    case 'lg':
      sizeClasses = 'w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl';
      break;
    default:
      sizeClasses = 'w-8 h-8 rounded-full';
  }

  return (
    <div
      {...props}
      className={`${sizeClasses} bg-gray-600 shadow-md overflow-hidden flex items-center justify-center ${props.className}`}
    >
      {!isError ? (
        <img
          src={user.avatar}
          onError={e => {
            setIsError(true);
          }}
        />
      ) : (
        <PersonIcon
          className={`color-current text-white`}
          size={size == 'lg' ? 'large' : 'small'}
        />
      )}
    </div>
  );
}
