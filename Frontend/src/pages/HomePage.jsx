import axios from "axios";
// import { log } from "console";
import React, { useEffect, useState } from "react";
import UserPost from "../components/UserPost";
const source = axios.CancelToken.source();
const HomePage = () => {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    axios
      .get("/api/posts/feed", {
        cancelToken: source.token,
      })
      .then((res) => {
        // console.log(res.data.data);
        setFeed(res.data.data);
      });
  }, []);
  // console.log(feed.length);
  return (
    <div className="lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24 text-white">
      {feed.length > 0 ? (
        feed.map((feed) => <UserPost key={feed._id} user={feed} />)
      ) : (
        <div className=" text-center text-slate-500 text-4xl mt-10">
          No Post
        </div>
      )}
    </div>
  );
};

export default HomePage;
