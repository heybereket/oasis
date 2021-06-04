import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface Props {
  open: boolean;
  closeHandler: any;
  children?: React.ReactNode;
  modalClasses?: string;
}

export const Modal: React.FC<Props> = ({
  open,
  closeHandler,
  children,
  modalClasses,
}) => {
  if (typeof window === 'undefined' || !open) return null;

  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(modalRef, () => closeHandler());

  return (
    <div className="bg-dim w-screen h-screen flex justify-center items-center fixed z-50 top-0 left-0">
      <div ref={modalRef} className={`fixed flex z-50 ${modalClasses}`}>
        <div className="relative w-full bg-gray-700 p-10 rounded-2xl">
          <svg
            onClick={() => {
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
    </div>
  );
};
