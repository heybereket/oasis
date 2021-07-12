import React from 'react';

export const DownArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 512 512"
      stroke="currentColor"
      {...props}
    >
      <polyline
        points="112 268 256 412 400 268"
        style={{ fill: 'none ', strokeWidth: '48px' }}
      />
      <line
        x1="256"
        y1="392"
        x2="256"
        y2="100"
        style={{ fill: 'none ', strokeWidth: '48px' }}
      />
    </svg>
  );
};
