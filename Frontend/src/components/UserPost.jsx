import React, { useState } from "react";
import Action from "./Action";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import TimeAgo from "../utils/TimeAgo";
import axios from "axios";
import toast from "react-hot-toast";
const UserPost = ({ user, isMe }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const deletePost = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/posts/${userId}`);
      if (data?.message) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/${user.postBy.username}/${user._id}`}
      className="w-full sm:mx-auto bg-zinc-950 text-white sm:px-8 flex overflow-hidden pb-5"
    >
      <div className="w-14 relative h-full shadow-2xl whitespace-nowrap">
        <div>
          <img
            className="w-12 rounded-full h-12 "
            src={
              user.postBy.profilePic ||
              "https://cdnb.artstation.com/p/assets/images/images/008/461/423/smaller_square/ivan-smolin-default-avatar.jpg?1512944873"
            }
            alt=""
          />
        </div>
      </div>

      <div className="w-full ml-2">
        <div className="flex justify-between w-full mt-2 mb-4">
          <div>
            <h1 className="font-semibold whitespace-nowrap">
              {user.postBy.name}
            </h1>
          </div>

          <div className="text-slate-500 flex items-center gap-2 whitespace-nowrap tracking-tighter text-sm">
            about <TimeAgo date={user?.createdAt} />
            {isMe && (
              <button className=" text-2xl hover:text-red-700">
                <MdDelete onClick={() => deletePost(user._id)} />
              </button>
            )}
          </div>
        </div>
        <div className="font-semibold mb-2">
          <p>{user.text} </p>
        </div>
        {user.post && (
          <div>
            <img className="rounded-md h-96 w-full" src={user.post} alt="" />
          </div>
        )}
        <div className=" whitespace-nowrap flex items-center">
          <Action liked={liked} setLiked={setLiked} user={user} />
        </div>
        <div className="mt-2 text-slate-400">
          <span className="mr-2"> {user.comments.length} replies </span>
          <span>{user.likes.length} likes</span>
        </div>
      </div>
    </Link>
  );
};

export default UserPost;
