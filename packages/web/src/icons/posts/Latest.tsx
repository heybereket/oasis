import React from 'react';

export const Latest: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      style={{ msTransform: 'rotate(360deg)', transform: 'rotate(360deg)' }}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 512 512"
      {...props}
      className="feather feather-heart"
    >
      <path
        d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48zm96 240h-96a16 16 0 0 1-16-16V128a16 16 0 0 1 32 0v128h80a16 16 0 0 1 0 32z"
        fill="white"
      />
    </svg>
  );
};
