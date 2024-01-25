import React from "react";
import { FaThreads } from "react-icons/fa6";
const Header = () => {
  return (
    <div className="w-full h-16 flex justify-center bg-black md:hidden items-center">
      <div className="text-4xl text-white">
        <FaThreads />
      </div>
    </div>
  );
};

export default Header;
