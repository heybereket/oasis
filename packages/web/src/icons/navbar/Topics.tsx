import React from 'react';

export const Topics: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.82 12.7H2.88C2.38139 12.7 1.90321 12.5104 1.55064 12.1728C1.19807 11.8352 1 11.3774 1 10.9V2.8C1 2.32261 1.19807 1.86477 1.55064 1.52721C1.90321 1.18964 2.38139 1 2.88 1H11.34C11.8386 1 12.3168 1.18964 12.6694 1.52721C13.0219 1.86477 13.22 2.32261 13.22 2.8V3.7M9.46 7.3H17.92C18.9583 7.3 19.8 8.10589 19.8 9.1V17.2C19.8 18.1941 18.9583 19 17.92 19H9.46C8.42171 19 7.58 18.1941 7.58 17.2V9.1C7.58 8.10589 8.42171 7.3 9.46 7.3Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
