import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserPostsQuery } from "../redux/api/postAPI";

const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState([]);

  const { data } = useUserPostsQuery(params.username);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.username) {
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
  }, [params.username, data]);
  console.log(user);
  return (
    <div className=" lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] pb-10 bg-black min-h-[100vh]">
      {user.length > 0 && <UserHeader info={user[0].user} />}
      {user[0]?.posts.length > 0 &&
        user[0].posts.map((i) => <UserPost key={i._id} user={i} />)}
    </div>
  );
};

export default UserPage;
