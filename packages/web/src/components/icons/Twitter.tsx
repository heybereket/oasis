import React from 'react';

export const Twitter: React.FC<React.SVGProps<SVGElement>> = (
  { children: _ },
  props
) => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.403 11.6004C9.6859 11.6004 12.5755 7.29111 12.5755 3.55381C12.5755 3.43131 12.5755 3.30953 12.5671 3.18843C13.1281 2.78922 13.6134 2.29323 14 1.72349C13.4753 1.95284 12.9196 2.10291 12.3508 2.16919C12.9479 1.81848 13.3968 1.26242 13.6136 0.604787C13.0485 0.934499 12.4317 1.16641 11.7894 1.29077C11.2624 0.743158 10.5419 0.423631 9.78228 0.400734C9.02262 0.377837 8.28421 0.653528 7.7252 1.16841C7.35982 1.50485 7.09035 1.93234 6.94436 2.40708C6.79837 2.88183 6.7811 3.3867 6.8943 3.87031C5.75652 3.816 4.64252 3.5251 3.62329 3.01651C2.60405 2.50791 1.70193 1.79263 0.9744 0.916164C0.607776 1.53872 0.495652 2.27877 0.661414 2.98198C0.827176 3.6852 1.25802 4.29735 1.8641 4.69063C1.40755 4.67767 0.960595 4.5566 0.56 4.33721V4.37276C0.5607 5.71886 1.5246 6.87803 2.8644 7.14473C2.44145 7.25849 1.99824 7.27524 1.568 7.19326C1.9439 8.34546 3.0226 9.13413 4.2511 9.15723C3.0427 10.0905 1.51597 10.5118 0 10.3299C1.31796 11.1611 2.84484 11.601 4.403 11.5983"
        fill="#F2F5FB"
      />
    </svg>
  );
};
