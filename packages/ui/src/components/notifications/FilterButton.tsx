import React from 'react';
import { Button } from '../shared/Button';

interface Props {
  text: string;
}

export const FilterButton: React.FC<Props> = ({ text }) => {
  return <Button>{text}</Button>;
};

export default FilterButton;
