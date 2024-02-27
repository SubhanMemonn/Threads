import axios from "axios";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutUserSuccess } from "../redux/reducer/userReducer";
const Sidebar = () => {
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      const { data } = await axios.post(`/api/users/logout`);
      if (data) {
        dispatch(LogoutUserSuccess());
      }
    } catch (error) {}
  };
  return (
    <div className="h-full border-r-2 hidden md:block justify-center items-cente bg-black sm:w-60 border-slate-500 fixed left-0 lg:w-[20%] top-0">
      <Link
        to={"/"}
        className="flex pt-14 justify-center items-cente text-white border-slate-400"
      >
        <div className="text-5xl text-white">
          <FaThreads />
        </div>
        <div className="text-xl ml-3 font-bold ">Threads</div>
      </Link>
      <Link to={"/"} className="flex pt-11 justify-center mr-8  text-white">
        <div className="text-2xl">
          <LuHome />
        </div>
        <div className="text-xl font-semibold ml-3 hover:font-bold ">Home</div>
      </Link>
      <Link
        to={"/search"}
        className="flex pt-8 justify-center mr-7  text-white"
      >
        <div className="text-2xl font-bold">
          <IoSearch />
        </div>
        <div className="text-xl font-semibold ml-3 hover:font-bold ">
          Explore
        </div>
      </Link>
      <Link
        to={"/profile"}
        className="flex pt-8 justify-center mr-8  text-white"
      >
        <div className="text-2xl">
          <RxAvatar />
        </div>
        <div className="text-xl font-semibold ml-3 hover:font-bold ">
          Profile
        </div>
      </Link>
      <Link
        to={"/Create-post"}
        className="flex pt-8 justify-center mr-4  text-white"
      >
        <div className="text-2xl">
          <IoMdAdd />
        </div>
        <div className="text-xl font-semibold ml-3 hover:font-bold ">
          Add Post
        </div>
      </Link>
      <div
        className="flex pt-8 justify-center mr-3  text-white cursor-pointer"
        onClick={logOut}
      >
        <div className="text-2xl">
          <FaSignOutAlt />
        </div>
        <div className="text-xl font-semibold ml-3 hover:font-bold ">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
