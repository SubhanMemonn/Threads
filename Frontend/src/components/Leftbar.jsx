import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Leftbar = () => {
  const [user, SetUser] = useState([]);
  useEffect(() => {
    axios.get("/api/users/suggested").then((res) => SetUser(res.data.data));
  }, []);
  return (
    <div className="h-full hidden lg:block border-l-2 bg-black border-slate-400 w-[22%] fixed right-0 top-0">
      <h1 className="text-xl font-bold text-center mt-8 mb-8 text-white">
        Suggestion for you
      </h1>
      {user.map((i, index) => (
        <Suggestion key={index} user={i} />
      ))}
    </div>
  );
};
export const Suggestion = ({ user }) => {
  return (
    <>
      <div className="lg:mx-auto md:h-20 flex lg:items-center lg:px-1 md:border-2 bg-black text-white border-gray-500 md:rounded-md justify-between w-full mb-4 overflow-hidden mt-4 lg:w-[98%]">
        <Link
          to={`/${user.username}`}
          className="flex items-center overflow-hidden"
        >
          <div className="overflow-hidden">
            <img
              className="w-14 h-14 rounded-full"
              src={
                user.profilePic ||
                "https://cdnb.artstation.com/p/assets/images/images/008/461/423/smaller_square/ivan-smolin-default-avatar.jpg?1512944873"
              }
              alt=""
            />
          </div>
          <div className="leading-3 ml-1">
            <h3 className="text-md font-semibold">{user.name}</h3>
            <span className="text-sm text-slate-400">@{user.username}</span>
          </div>
        </Link>
        <button className="text-white sm:p-2 rounded-md bg-gray-900 hover:bg-slate-400 font-semibold hidden">
          Follow
        </button>
      </div>
    </>
  );
};
export default Leftbar;
