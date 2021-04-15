import React from 'react';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  error?: boolean;
  textarea?: boolean;
}

export const Input: React.FC<InputProps> = ({
  error,
  textarea,
  className,
  ...props
}) => {
  const styles = `w-full py-2 px-4 rounded-lg text-gray-100 placeholder-gray-300 bg-gray-700 border border-gray-600 focus:outline-none focus:ring shadow-lg ${
    error ? 'ring-1 ring-primary' : ''
  } ${className}`;
  if (textarea) {
    return <textarea className={styles + ' resize-none'} {...(props as any)} />;
  }
  return <input className={styles} {...props} />;
};
