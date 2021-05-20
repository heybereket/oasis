import React from 'react';

export const RightArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
};
