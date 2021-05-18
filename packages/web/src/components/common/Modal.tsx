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
    <div className="w-screen h-screen bg-black top-0 left-0 fixed flex justify-center items-center">
      <div ref={modalRef} className="bg-gray-600">
        <svg
          onClick={() => closeHandler()}
          className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-500 rounded-full"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        {children}
      </div>
    </div>
  );
};
