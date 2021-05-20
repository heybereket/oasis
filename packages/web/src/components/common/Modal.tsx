import React from 'react';
interface Props {
  open: boolean;
  closeHandler: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ open, closeHandler, children }) => {

  if (!open) return null;

  const checkClickedOnOutside = (e: any) => {
    const modal = document.getElementById("modal") as HTMLElement;
    if (e.target.id == "modal") {

      modal.classList.add('hide');
      closeHandler();

    }

  }

  return (
    <div id="modal" onClick={(e) => checkClickedOnOutside(e)} className="w-screen z-50 h-screen bg-black bottom-0 right-0 top-0 left-0 fixed flex justify-center items-center">
      <div>
        <span className="flex justify-between">

          <span></span>
          <svg
            onClick={() => closeHandler()}
            className=" h-6 w-6 cursor-pointer p-1 hover:bg-gray-500 rounded-full"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>

        {children}

      </div>

    </div>
  );
}
