import React from 'react';

export const Trash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" strokeWidth="2" />
      <path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        strokeWidth="2"
      />
    </svg>
  );
};
