import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToggleLikeMutation } from "../redux/api/postAPI";
const Action = ({ liked, setLiked, user }) => {
  const { user: me } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [toggleLike] = useToggleLikeMutation();
  useEffect(() => {
    if (user.likes.includes(me._id)) {
      setLiked(true);
    }
  }, []);

  const likedPost = async () => {
    try {
      if (user._id) {
        setLiked(!liked);
        const { data } = await toggleLike(user._id);
        if (data.message === "Post liked Successfully") {
          // console.log(data);
          navigate(`/${user.username}/${user._id}`);
          setLiked(true);
        }
        if (data.message === "Post Unliked Successfully") {
          navigate(`/${user.username}/${user._id}`);
          setLiked(false);
        }
      } else {
        toast.error("Timeout");
      }
    } catch (error) {
      console.log(error);
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
