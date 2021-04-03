import React, { useState } from "react";
import firebase, { loginGitHub, logout } from "../data/firebase";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const user = firebase.auth().currentUser;

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-black p-3 ">
        <a href="/" className="inline-flex items-center p-2 mr-4 ">
          <img
            src="static/oasis-logo.png"
            className="fill-current text-white w-15 h-11 mr-2"
          ></img>
        </a>
        <button
          className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white ">
              Home
            </a>

            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              About us
            </a>

            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Submit
            </a>
            {user ? (
              <a
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded bg-green-600 text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-green-600"
                onClick={logout}
              >
                Logout
              </a>
            ) : (
              <a
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded bg-green-600 text-white font-bold items-center justify-center hover:bg-gray-600 hover:text-green-600"
                onClick={loginGitHub}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
