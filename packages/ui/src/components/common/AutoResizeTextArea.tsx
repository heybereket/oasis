import React, { useRef, TextareaHTMLAttributes } from 'react';

type Props = {
  maxHeight?: number;
};

export const AutoResizeTextArea: React.FC<
  Props & TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ maxHeight, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const handleKeyDown = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'inherit';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      // In case you have a limitation
      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        maxHeight ?? Number.MAX_SAFE_INTEGER
      )}px`;
    }
  };

  return (
    <textarea onKeyDown={handleKeyDown} ref={textAreaRef as any} {...props} />
  );
};
