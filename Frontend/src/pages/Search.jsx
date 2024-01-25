import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Suggestion } from "../components/Leftbar";
import { useState } from "react";
import axios from "axios";
import _debounce from "lodash/debounce";
import { useSelector } from "react-redux";

const Search = () => {
  const { user: me } = useSelector((store) => store.userReducer);
  const [value, setValue] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const source = axios.CancelToken.source();
  useEffect(() => {
    const fetch = async () => {
      try {
        if (value) {
          const { data } = await axios.get(`/api/users/profile/${value}`, {
            cancelToken: source.token,
          });

          if (data.data && data.data._id && data.data.name) {
            console.log(me);
            if (data.data.username == me.username) {
              setUser([]);
            }
            setUser([data.data]);
          }
        } else {
          setUser([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const debounceFetchData = _debounce(fetch, 200);
    debounceFetchData();
    return () => source.cancel("cancel");
  }, [value]);

  // console.log(user.length);
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
