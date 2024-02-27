import { useSelector } from "react-redux";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useUserPostsQuery } from "../redux/api/postAPI";
// import { log } from "console";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const { data, isLoading } = useUserPostsQuery(user.username);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (user) {
  //         // console.log(data);
  //         if (data.data.posts && data.data.posts.length > 0) {
  //           setPost(data.data.posts);
  //           // console.log(data);
  //         }
  //       } else {
  //         setPost([]);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [data]);
  console.log(data);

  return (
    <div className=" lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      <UserHeader info={user} />
      {!isLoading && Object.keys(data.data.posts).length > 0 ? (
        data.data.posts.map((i, index) => <UserPost key={index} user={i} />)
      ) : (
        <div className="text-5xl text-center font-semibold text-slate-500">
          No Posts
        </div>
      )}
    </div>
  );
};

export default Profile;
