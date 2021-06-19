import React from 'react';

interface Props {
  title?: string;
  description?: string | any;
}

const TabMeta: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      {title && <h4 className="font-extrabold">{title}</h4>}
      {description && (
        <h5 className="text-gray-300 font-bold">{description}</h5>
      )}
    </>
  );
};

export default TabMeta;
