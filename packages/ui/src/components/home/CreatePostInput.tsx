import React, { ChangeEvent, useState } from "react";
import { Info } from "../../icons";

interface Props {
  onSubmit: (value: string) => void
  avatarUrl: string
}

export const CreatePostInput: React.FC<Props> = ({
  onSubmit,
  avatarUrl
}) => {

  const [value, setValue] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit(value)
      setValue('')
    }
  }

  return (
    <div className="flex flex-row justify-between p-5 rounded-xl bg-gray-800">
      <div className="flex flex-row w-full">
        <img
          src={avatarUrl}
          className="w-8 h-8 rounded-full"
        />
        <input
          value={value}
          style={{ letterSpacing: '0.035rem' }}
          className="bg-transparent w-full placeholder-white ml-3 text-base focus:outline-none"
          placeholder="What's on your mind?"
          onKeyPress={handleKeyPress}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center">
        <Info className="w-5 h-5" />
      </div>
    </div>
  );
};

export default CreatePostInput;


