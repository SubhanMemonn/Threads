import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaSignOutAlt } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutUserSuccess, followUserSuccess } from "../reducer/userReducer";
const UserHeader = ({ info, isUser }) => {
  const { user } = useSelector((store) => store.userReducer);

  const dispatch = useDispatch();

  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    if (info?.followers.includes(user?._id)) {
      setIsFollow(true);
    }
  }, []);

  const followToggler = async (userId) => {
    setIsFollow(!isFollow);
    if (userId) {
      const { data } = await axios.post(`/api/users/follow/${userId}`);
      console.log(data);
      if (data) {
        dispatch(followUserSuccess(data.message));
        toast.success(data.messsage);
        // naviage(`/${userId}`);
      }
    }
  };
  return (
    <div className="text-white sm:pt-6 lg:w-full sm:mx-auto md:px-8 overflow-hidden bg-zinc-950 pt-5 justify-center flex flex-col px-2 h-full pb-8">
      <div className="justify-between flex mb-10">
        <div>
          <h1 className="text-3xl font-bold">{info.name}</h1>
          <div className="mt-2">
            <span className="mr-2 text-gray-600">@{info.username}</span>
            <span className="rounded-xl p-1 bg-zinc-900">treads.net</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <img
            className="rounded-full w-20 overflow-hidden sm:mr-0 h-20"
            src={
              info.profilePic ||
              "https://cdnb.artstation.com/p/assets/images/images/008/461/423/smaller_square/ivan-smolin-default-avatar.jpg?1512944873"
            }
            alt={info.name}
          />
        </div>
      </div>
      <div className="justify-between flex mb-8">
        <p>{info.bio}</p>
      </div>
      <div className="flex mb-4 gap-4">
        {isUser ? (
          <Link
            to={"/update"}
            className="text-white rounded-full bg-black p-2 shadow-lg hover:opacity-25"
          >
            Edit profile
          </Link>
        ) : (
          <>
            <button
              onClick={() => followToggler(info._id)}
              className="text-white rounded-lg bg-black px-4 py-2 shadow-lg hover:opacity-50"
            >
              {!isFollow ? "Follow" : "Following"}
            </button>
          </>
        )}
      </div>
      <div className="justify-between flex mb-20">
        <div className="flex gap-3 items-center">
          {isUser ? (
            <>
              <div className=" whitespace-nowrap">
                {isFollow ? info.following.length + 1 : info.following.length}{" "}
                Following
              </div>
              <div className=" whitespace-nowrap">
                {info.followers.length} Followers
              </div>
            </>
          ) : (
            <div>
              {isFollow ? info.followers.length + 1 : info.followers.length}{" "}
              Followers
            </div>
          )}
          <div className="bg-slate-400 w-2 h-2 rounded-full hidden sm:flex"></div>
          <div className="hidden sm:flex">
            <a href="blank"> instagram.com</a>
          </div>
        </div>
        <div className="flex gap-5 text-2xl sm:mr-0 cursor-pointer">
          <div>
            <FaInstagram />
          </div>
          <div>
            <PiDotsThreeBold />
          </div>
        </div>
      </div>
      <div className="justify-around flex border-b-2 border-r-white font-semibold">
        <div className="hover:bg-black hover:rounded-xl hover:p-1 cursor-pointer">
          Threads
        </div>
        <div className="over:bg-black hover:rounded-xl hover:p-1 cursor-pointer">
          Replies
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
