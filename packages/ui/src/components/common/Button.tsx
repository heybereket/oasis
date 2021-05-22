import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'primary' | 'gray';
  size?: 'sm' | 'md' | 'xs';
}

const colors = {
  primary: 'bg-primary hover:bg-primary-light text-white',
  gray: 'bg-gray-600 hover:bg-gray-500 text-white',
};

const sizes = {
  xs: 'py-1.5 px-5 rounded-lg',
  md: 'py-2.5 px-6 rounded-lg',
  sm: 'py-2 px-5 rounded-lg text-base',
};

export const Button: React.FC<ButtonProps> = ({
  color = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`font-bold focus:outline-none focus:ring ${colors[color]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
