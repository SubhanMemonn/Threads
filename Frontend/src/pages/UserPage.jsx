import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.username) {
          const { data } = await axios(`/api/posts/user/${params.username}`);
          if (data.data) {
            setUser([data.data]);
            // console.log([data.data]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.username]);

  return (
    <div className=" lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] pb-10 bg-black min-h-[100vh]">
      {user.length > 0 && <UserHeader info={user[0].user} />}
      {user[0]?.posts.length > 0 &&
        user[0].posts.map((i) => <UserPost key={i._id} user={i} />)}
    </div>
  );
};

export default UserPage;
