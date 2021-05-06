import React from 'react';

export const BellIcon: React.FC<React.SVGProps<SVGElement>> = (
  { children: _ },
  props
) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6587 18.103C10.5005 18.3758 10.2733 18.6023 10 18.7597C9.7267 18.9171 9.41683 19 9.10144 19C8.78604 19 8.47618 18.9171 8.20287 18.7597C7.92957 18.6023 7.70242 18.3758 7.54416 18.103M14.5024 6.40096C14.5024 4.96853 13.9334 3.59478 12.9205 2.5819C11.9076 1.56903 10.5339 1 9.10144 1C7.66901 1 6.29526 1.56903 5.28238 2.5819C4.26951 3.59478 3.70048 4.96853 3.70048 6.40096C3.70048 12.7021 1 14.5024 1 14.5024H17.2029C17.2029 14.5024 14.5024 12.7021 14.5024 6.40096Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
