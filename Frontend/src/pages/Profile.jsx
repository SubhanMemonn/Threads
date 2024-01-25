import { useSelector } from "react-redux";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useEffect, useState } from "react";
import axios from "axios";
// import { log } from "console";

const Profile = () => {
  const { user } = useSelector((store) => store.userReducer);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const { data } = await axios.get(`/api/posts/user/${user.username}`);
          if (data.data.posts && data.data.posts.length > 0) {
            setPost(data.data.posts);
            // console.log(data);
          }
        } else {
          setPost([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // console.log(post);
  // console.log(post.length);
  return (
    <div className=" lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      <UserHeader info={user} isUser={user} />
      {post.length > 0 ? (
        post.map((i, index) => <UserPost key={index} user={i} isMe={user} />)
      ) : (
        <div className="text-5xl text-center font-semibold text-slate-500">
          No Posts
        </div>
      )}
    </div>
  );
};

export default Profile;
