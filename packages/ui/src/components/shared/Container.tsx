import React from 'react';

export const Container: React.FC = ({ children }) => {
  return <div className={`lg:max-w-lg mx-auto`}>{children}</div>;
};
