import React from 'react';

export const Container: React.FC = ({ children }) => {
  return <div className={`lg:max-w-nav mx-auto`}>{children}</div>;
};
