import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import React, { useEffect, useState } from "react";
import UserPost from "../components/UserPost";
import { useNewFeedQuery, useOldFeedQuery } from "../redux/api/postAPI";
import { Link } from "react-router-dom";
const source = axios.CancelToken.source();
const HomePage = () => {
  const { data: newFeed, isLoading: newLoading } = useNewFeedQuery();
  const { data: oldFeed, isLoading: oldLoading } = useOldFeedQuery();
  const [showOldPost, setShowOldPost] = useState(false);
  console.log(newFeed);
  const show = () => {
    setShowOldPost(true);
  };
  // console.log();
  return (
    <div className="lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24 text-white">
      {typeof newFeed === "object" &&
        Object.keys(newFeed.data).length > 0 &&
        newFeed.data.map((feed) => <UserPost key={feed._id} user={feed} />)}
      {typeof oldFeed === "object" && Object.keys(oldFeed).length > 0 ? (
        <div className="w-[70%] mx-auto flex flex-col gap-2">
          <span className="text-9xl flex justify-center">
            <IoIosCheckmarkCircleOutline className=" text-gray-800" />
          </span>
          <h1 className=" font-semibold text-center text-xl">
            {typeof newFeed === "object"
              ? "You're all caught up"
              : "No new Post"}
          </h1>
          <p
            onClick={show}
            className="text-center text-blue-500 cursor-pointer"
          >
            View older posts
          </p>
        </div>
      ) : (
        <>
          <center>
            <h1 className=" font-semibold text-4xl text-slate-600">No post</h1>

            <button
              type="button"
              class="text-white bg-[#000000] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mt-8 hover:rounded-xl"
            >
              <Link to={"/profile"}>Go to profile</Link>
            </button>
          </center>
        </>
      )}
      {showOldPost &&
        Object.keys(oldFeed.data).length > 0 &&
        oldFeed.data.map((feed) => <UserPost key={feed._id} user={feed} />)}
    </div>
  );
};

export default HomePage;
