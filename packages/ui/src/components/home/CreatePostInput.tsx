import React, { ChangeEvent, useState } from 'react';
import { RightArrow } from '../../icons';
import { AutoResizeTextArea } from '../shared/AutoResizeTextArea';

interface Props {
  onSubmit: (value: string) => void;
  avatarUrl: string;
}

export const CreatePostInput: React.FC<Props> = ({ onSubmit, avatarUrl }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };

  return (
    <div className="flex flex-row justify-between p-5 rounded-xl bg-gray-800">
      <div className="flex flex-row w-full">
        <img src={avatarUrl} className="w-8 h-8 rounded-full" />
        <AutoResizeTextArea
          value={value}
          style={{ letterSpacing: '0.035rem', resize: 'none' }}
          className={`bg-transparent w-full placeholder-white ml-3 text-base focus:outline-none`}
          placeholder="What's on your mind?"
          onChange={handleChange}
          rows={1}
        />
      </div>
      <div className="flex items-center">
        <RightArrow className="w-5 h-5" onClick={() => handleSubmit()} />
      </div>
    </div>
  );
};

export default CreatePostInput;
