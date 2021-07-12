import React from 'react';
import { useLink } from './LinkProvider';

type Props = {
  href?: string;
  className?: string;
};

export const CustomLink: React.FC<Props> = ({ children, href, className }) => {
  const { link: createLink } = useLink();
  return createLink(children, href, className);
};
