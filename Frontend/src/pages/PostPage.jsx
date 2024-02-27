import React, { useEffect, useState } from "react";
import Action from "../components/Action";
// import { BsThreeDots } from "react-icons/bs";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useCommentMutation, useGetPostQuery } from "../redux/api/postAPI";
import TimeAgo from "../utils/TimeAgo";
const PostPage = () => {
  const [like, setLike] = useState(false);
  const [post, setPost] = useState([]);
  const [text, setText] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [comment] = useCommentMutation();
  // const [Loader, setLoader] = useState(false);
  const { data, isLoading } = useGetPostQuery(params.pid);

  useEffect(() => {
    // setLoader(true);
    if (data.data) {
      // console.log(data);
      setPost(data.data);
    } else {
      setPost([]);
    }

    // setLoader(false);
  }, [text, params]);

  const addComment = async () => {
    try {
      if (params?.pid) {
        const { data } = await comment({ postId: params.pid, text });
        if (data.data) {
          setText("");
          navigate(`/${post.username}/${params.pid}`);
          // console.log(data);
        }
      }
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };
  console.log(post.length);
  return (
    <div className=" lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      {post.length === 0 || isLoading ? (
        <Loader />
      ) : (
        <div className="w-full sm:w-[80%] mx-auto flex flex-col">
          <div className="w-full sm:w-[80%] mx-auto flex items-center justify-between mb-5">
            <Link to={`/${post.postBy.username}`} className="flex items-center">
              <div className=" overflow-hidden">
                <img
                  className="rounded-full w-11 h-11"
                  src={
                    post?.postBy.profilePic ||
                    "https://cdnb.artstation.com/p/assets/images/images/008/461/423/smaller_square/ivan-smolin-default-avatar.jpg?1512944873"
                  }
                  alt=""
                />
              </div>
              <div className="text-white font-semibold ml-2">
                <h1>{post?.postBy.name}</h1>
              </div>
            </Link>
            <div className="text-slate-500">
              <span>
                <TimeAgo date={post?.createdAt} />
              </span>
            </div>
          </div>
          <div className="text-white w-full sm:w-[80%] mx-auto flex items-center justify-between mb-5">
            <span className="">{post?.text} </span>
          </div>
          {post?.post && (
            <div className="w-full sm:w-[80%] mx-auto flex items-center justify-between mb-2">
              <img className="" src={post?.post} alt="" />
            </div>
          )}
          <div className="text-white sm:w-[80%] sm:mx-auto">
            <Action liked={like} setLiked={setLike} user={post} />
          </div>
          <div className="text-slate-400 sm:w-[80%] sm:mx-auto mt-5 mb-4">
            <span className="mr-4">{post?.comments.length} replies</span>
            <span>{post?.likes.length} like</span>
          </div>
          <div className="w-full h-16 border-slate-600 border-y flex justify-between items-center">
            <div className=" text-2xl px-2 w-full whitespace-nowrap">
              👋{" "}
              <input
                className="bg-transparent pl-4 text-white text-xl outline-none w-[90%]"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Wow....."
              />
            </div>
            <button
              className="text-white font-semibold bg-black px-3 py-2 rounded-xl hover:bg-zinc-600"
              onClick={addComment}
            >
              Post
            </button>
          </div>

          {post?.comments.map((i) => (
            <div className="w-full h-20 border-slate-600 border-b flex justify-between">
              <Link
                key={i._id}
                to={`/${i.username}`}
                className="flex items-center text-white"
              >
                <div>
                  <img
                    className="rounded-full w-12 h-12"
                    src={
                      i.userProfilePic ||
                      "https://cdnb.artstation.com/p/assets/images/images/008/461/423/smaller_square/ivan-smolin-default-avatar.jpg?1512944873"
                    }
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div>
                    <h1 className="font-semibold">{i.username}</h1>
                  </div>
                  <div>
                    <p className=" text-slate-400 text-sm mt-1">{i.text}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
