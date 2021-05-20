import React, { useRef } from 'react';
import { useOnClickOutside } from '@utils/hooks/useOnClickOutside';

interface Props {
  open: boolean;
  closeHandler: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ open, closeHandler, children }) => {
  if (typeof window === 'undefined' || !open) return null;

  const modalRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(modalRef, () => closeHandler());

  return (
    <div className="w-screen h-screen bg-dim top-0 left-0 fixed flex justify-center items-center z-50">
      <div className="relative max-w-530 w-full bg-gray-700 p-10 rounded-2xl">
        <svg
          onClick={() => {
            console.log('this ran');
            closeHandler();
          }}
          className="absolute top-4 right-4 h-8 w-8 cursor-pointer p-1 hover:bg-gray-500 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        {children}
      </div>
    </div>
  );
};
