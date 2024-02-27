import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const { user } = useSelector((store) => store.userReducer);
  // const dispatch = useDispatch();
  const [postBy, setPostBy] = useState(user._id);
  const [text, setText] = useState("");
  const [postPrev, setPostPrev] = useState("");
  const [post, setPost] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPostPrev(reader.result);
          setPost(reader.result);
        }
      };
    }
  };
  console.log(post);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/posts/create",
        {
          postBy,
          post,
          text,
        },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(postBy, text, post);
      // console.log("upload data", data);

      if (data.data) {
        toast.success(data.message);
        navigate("/");
      } else {
        return console.log(data.message);
      }
    } catch (error) {
      toast.error(error, "Failed to updated");
    }
  };
  return (
    <div className="lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      <div>
        <div className="w-full px-4 sm:px-6 lg:px-8 shadow-md border-b-2 border-slate-600">
          <div className="flex justify-between"></div>

          <div className="flex sm:justify-between items-center my-2 flex-col">
            {postPrev && (
              <img className="w-60 rounded-md h-60" src={postPrev} alt="" />
            )}
            <div className="flex w-full items-center justify-center bg-grey-lighter">
              <label className="flex flex-col items-center text-white bg-slate-800 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white p-1">
                Upload Photo
                <input
                  type="file"
                  class="hidden"
                  onChange={changeImageHandler}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full lg:ml-4 shadow-md pt-8">
          <div className="rounded  shadow px-6">
            <form className="pb-6">
              <label className="font-semibold text-gray-700 block pb-1">
                Write Some through
              </label>
              <div className="flex mb-4">
                <input
                  className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <p className="text-center mt-8">
                <button
                  onClick={submitHandler}
                  className="text-xl text-white bg-slate-900 px-12 py-4 rounded-full"
                >
                  Upload
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
