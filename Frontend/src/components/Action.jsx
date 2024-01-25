import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Action = ({ liked, setLiked, user }) => {
  const { user: me } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  const actionsCheck = () => {
    if (user?.likes.includes(me._id)) {
      setLiked(true);
    }
  };
  actionsCheck();
  const likedPost = async () => {
    {
      try {
        if (user._id) {
          setLiked(!liked);
          const { data } = await axios.put(`/api/posts/like/${user._id}`);
          if (data.message) {
            console.log(data);
            navigate(`/${user.username}/${user._id}`);
          }
        } else {
          toast.error("Timeout");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-4 text-xl flex gap-5 cursor-pointer">
      <div className={liked ? "text-red-700" : ""} onClick={likedPost}>
        <FaHeart />
      </div>
      <div>
        <FaRegComment />
      </div>
      <div>
        <FaRotate />
      </div>
      <div>
        <FaShare />
      </div>
    </div>
  );
};

export default Action;
