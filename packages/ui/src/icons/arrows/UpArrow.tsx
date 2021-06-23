import React from 'react';

export const UpArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      stroke="currentColor"
      {...props}
    >
      <polyline
        points="112 244 256 100 400 244"
        style={{ fill: 'none ', strokeWidth: '48px' }}
      />
      <line
        x1="256"
        y1="120"
        x2="256"
        y2="412"
        style={{ fill: 'none ', strokeWidth: '48px' }}
      />
    </svg>
  );
};
