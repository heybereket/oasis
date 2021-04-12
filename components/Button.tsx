import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'primary' | 'gray';
  size?: 'sm' | 'md';
}

const colors = {
  primary: 'bg-primary text-white',
  gray: 'bg-gray-600 text-white',
};

const sizes = {
  md: 'py-2.5 px-6 rounded-md',
  sm: 'py-1 px-2 rounded-md',
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
