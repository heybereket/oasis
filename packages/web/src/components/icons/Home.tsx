import React from 'react';

export const Home: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.33333 19V10H11.6667V19M1 7.3L9 1L17 7.3V17.2C17 17.6774 16.8127 18.1352 16.4793 18.4728C16.1459 18.8104 15.6937 19 15.2222 19H2.77778C2.30628 19 1.8541 18.8104 1.5207 18.4728C1.1873 18.1352 1 17.6774 1 17.2V7.3Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
