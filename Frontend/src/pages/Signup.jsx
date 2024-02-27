import { useState } from "react";
import toast from "react-hot-toast";
import { FaThreads } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { RegisterSuccess } from "../redux/reducer/userReducer";

import { useSignupMutation } from "../redux/api/userAPI";
const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signup(inputs);
    console.log(res);
    if (res.error) {
      toast.error("Useranme or Email is already exists");
      setLoading(false);
    }
    if (res.data.success === true) {
      dispatch(RegisterSuccess(res.data.data));
      toast.success(data.message);
      <Navigate to={"/"} />;
      setLoading(false);
    }
  };

  return (
    <div className="bg-black h-[100vh] overflow-hidden">
      <nav className="w-full h-14 flex justify-center items-center bg-black">
        <div className="text-4xl text-white">
          <FaThreads />
        </div>
      </nav>
      <div className="w-[95%] mx-auto md:mx-auto rounded-md md:mt-24 mt-20 flex flex-col items-center h-3/4 md:w-1/2 overflow-hidden">
        <h1 className="text-white font-semibold text-4xl md:text-5xl">
          SignUp
        </h1>
        <form
          onSubmit={handleSignup}
          className="bg-zinc-950 h-full w-full rounded-md shadow-lg flex flex-col md:px-4 sm:w-full mt-5 lg:w-[80%]"
        >
          <div className="flex justify-cente w-full gap-3 mb-6 mx-auto md:w-[95%]">
            <div className="flex flex-col w-full">
              <label className="font-semibold text-white mb-2 mt-12">
                Full name
              </label>
              <input
                className="h-10 bg-transparent shadow-lg border-zinc-500 border rounded-md text-white w-full pl-2"
                required
                type="text"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold text-white mb-2 mt-12">
                Username
              </label>
              <input
                className="h-10 bg-transparent shadow-lg border-zinc-500 border rounded-md text-white w-full pl-2"
                required
                type="text"
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
              />
            </div>
          </div>
          <label className="ml-3 font-semibold text-white mb-2">Email</label>
          <input
            className="h-10 mx-4 bg-transparent shadow-lg border-zinc-500 border rounded-md text-white mb-4 pl-2"
            required
            type="email"
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
          />
          <label className="ml-3 font-semibold text-white mb-2">Password</label>
          <input
            className="h-10 mx-4 bg-transparent shadow-lg border-zinc-500 border rounded-md text-white pl-2"
            required
            type="password"
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
          />
          <p className="text-center">
            <button
              type="submit"
              className="btn text-white font-semibold text-2xl mt-8 bg-slate-700 p-2 rounded-xl w-[95%] md:w-11/12 md:text-xl md:rounded-md shadow-lg hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
          </p>
          <p className="text-center mt-4 text-slate-400">
            Already a user?
            <Link to={"/login"} className="text-blue-700 cursor-pointer">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
