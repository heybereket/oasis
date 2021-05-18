import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';
import CSS from 'csstype';
import EditProfile from '../pages/user/edit';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

type ModalProps = {
  isOpen: boolean;
  onClose: Function;
};
const Modal = ({ isOpen, onClose }: ModalProps) => {

  if (typeof window === 'undefined' || !isOpen) return null;

  const modalRef = useRef(document.createElement('div')) as React.MutableRefObject<HTMLInputElement>;


  const closeHandler = () => {
    onClose();
  };


  useOnClickOutside(modalRef, closeHandler);



  //{root  element to render modal in DOM in __document.tsx file}
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  return ReactDom.createPortal(
    <React.Fragment>
      <div style={OUTER_STYLE}>
        <div className="md" ref={modalRef} style={MODAL_STYLES}>

          <div style={CLOSE_BUTTON_STYLE}>
            <svg onClick={closeHandler}
              className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full"
              id="close-modal"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg></div>
          <EditProfile initialApolloState></EditProfile>
        </div>
      </div>
    </React.Fragment>,
    modalRoot
  );
};
//  '#0c111b' style background  color for modal
const MODAL_STYLES: CSS.Properties = {
  position: 'absolute',
  backgroundColor: '#0c111b',
  zIndex: 1000,
  borderRadius: '25px',
  gridArea: 'modal',
  left: '50%',
  width: '50%',

  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'all ease-in .4s'

};

const OUTER_STYLE: CSS.Properties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
  overflow: 'hidden',

};

const CLOSE_BUTTON_STYLE: CSS.Properties = {
  backgroundColor: '#232936',
  borderRadius: '50px',
  outline: 'none',
  zIndex: 1000,
  display: 'inline-block',
  transform: 'translate(-100%, -10%)',



};

export default Modal;
