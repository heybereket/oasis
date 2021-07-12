import React, { FC } from 'react';
import { FieldProps } from 'formik';

interface CustomInputProps {
  type?: string;
  className?: string;
  label: string;
}

export const StyledFormikInput: FC<CustomInputProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type = 'text',
  label,
  className,
  ...props
}) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      {...field}
      {...props}
      className={`w-full py-2 px-4 rounded-lg text-gray-100 placeholder-gray-300 bg-gray-700 border border-gray-600 focus:outline-none focus:ring shadow-lg ${
        errors[field.name] ? 'ring-1 ring-primary' : ''
      } ${className}`}
    />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);
