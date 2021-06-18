import React from 'react';

type Props = {
  title?: string;
  content: string | JSX.Element;
};

const TabData: React.FC<Props> = ({
  title,
  content
}) => {
  return (
    <>
      {title && <h4 className="font-extrabold">{title}</h4>}
      <h5 className="text-gray-300 font-bold">{content}</h5>
    </>
  );
};

export default TabData;
