import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Suggestion } from "../components/Leftbar";
import { useSearchQuery } from "../redux/api/userAPI";

const Search = () => {
  const { user: me } = useSelector((store) => store.user);
  const [value, setValue] = useState("");
  const [user, setUser] = useState([]);
  const { data } = useSearchQuery(value);
  useEffect(() => {
    try {
      if (value) {
        if (data.data) {
          // console.log(data.data);
          if (data.data.username == me.username) {
            setUser([]);
          } else {
            setUser([...data.data]);
          }
        }
      } else {
        setUser([]);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [value]);
  // console.log(user);
  return (
    <div className="lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      <div className="w-full h-16 border-y-2 border-slate-400 flex text-white gap-8 items-center rounded-md">
        <CiSearch className=" ml-2 text-2xl font-light" />{" "}
        <input
          className="h-full w-96 bg-transparent outline-none"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {user.length > 0 && (
        <div>
          {user?.map((i, index) => (
            <Suggestion key={index} user={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
