import React, { createContext, useContext } from 'react';

export const LinkContext = createContext<{
  link: (
    children: React.ReactNode,
    href?: string,
    className?: string
  ) => JSX.Element;
}>({
  link: function link(children, href, className) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  },
});

type Props = {
  link: (
    children: React.ReactNode,
    href?: string,
    className?: string
  ) => JSX.Element;
};

export const LinkProvider: React.FC<Props> = ({ link, children }) => {
  return (
    <LinkContext.Provider value={{ link }}>{children}</LinkContext.Provider>
  );
};

export const useLink = () => useContext(LinkContext);
