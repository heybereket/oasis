import React from 'react';

export const Saved: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8537 19L8.42683 14L1 19V3C1 2.46957 1.22356 1.96086 1.62151 1.58579C2.01945 1.21071 2.55917 1 3.12195 1H13.7317C14.2945 1 14.8342 1.21071 15.2322 1.58579C15.6301 1.96086 15.8537 2.46957 15.8537 3V19Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
