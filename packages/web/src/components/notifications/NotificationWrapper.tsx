import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const NotificationWrapper: React.FC<Props> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className="flex flex-col gap-2 mx-4 w-full">
      <div className="flex flex-row justify-between mb-7">
        <h3>Notifications</h3>
      </div>
      {children}
    </div>
  );
};

export default NotificationWrapper;
