import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="shadow-md h-20 flex items-center px-4 lg:px-10">
      <img src="/static/logo.svg" className={`h-12`}></img>
      <div className={`flex-grow`}></div>
      <a
        className={`bg-black text-white hover:bg-white hover:text-black transition duration-200 px-4 py-2 rounded-xl shadow-lg`}
      >
        Testing Page
      </a>
    </div>
  );
}
