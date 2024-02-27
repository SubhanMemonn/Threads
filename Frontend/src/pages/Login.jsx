import axios from "axios";
import React, { useState } from "react";
import { FaThreads } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { LoginSuccess } from "../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userAPI";
import { Spinner } from "flowbite-react";
const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email or password field are required");
    }
    setLoading(true);
    const res = await login({ email, password });

    if (res.error) {
      toast.error("email or password invalid");
      setLoading(false);
    }
    if (res.data.success === true) {
      setLoading(false);
      toast.success(res.data.message);
      dispatch(LoginSuccess(res.data.data));
      <Navigate to={"/"} />;
    }
  };
  return (
    <div className="bg-black h-[100vh] overflow-hidden">
      <nav className="w-full h-14 flex justify-center items-center bg-black">
        <div className="text-4xl text-white">
          <FaThreads />
        </div>
      </nav>
      <div className="w-[95%] mx-auto md:mx-auto rounded-md mt-24 flex flex-col items-center h-3/4 md:w-1/2 ">
        <h1 className="text-white font-semibold text-4xl md:text-5xl">Login</h1>
        <form
          onSubmit={handleLogin}
          className="bg-zinc-950 h-full w-full mx-8 rounded-md shadow-lg flex flex-col px-8 md:-mx-96 sm:w-full md:w-4/5 mt-5"
        >
          <label className="ml-3 font-semibold text-white mb-2 mt-20">
            Email
          </label>
          <input
            className="h-10 mx-4 bg-transparent shadow-lg border-zinc-500 border rounded-md mb-8 text-white"
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="ml-3 font-semibold text-white mb-2">Password</label>
          <input
            className="h-10 mx-4 bg-transparent shadow-lg border-zinc-500 border rounded-md text-white"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-center">
            <button
              className="btn text-white font-semibold text-2xl mt-8 bg-slate-700 p-2 rounded-xl w-full md:w-11/12 md:text-xl md:rounded-md shadow-lg hover:bg-gray-900"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Log In"}
            </button>
          </p>
          <p className="text-center mt-4 text-slate-400">
            Don't have an account?
            <Link to={"/signup"} className="text-blue-700 cursor-pointer">
              "Sign Up"
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
