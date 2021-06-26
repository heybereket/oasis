import React from 'react';

export const RightArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        points="268 112 412 256 268 400"
        style={{ fill: 'none ', strokeWidth: '48px' }}
      />
      <line
        x1="392"
        y1="256"
        x2="100"
        y2="256"
        style={{ fill: 'none ', strokeWidth: '48px' }}
      />
    </svg>
  );
};
