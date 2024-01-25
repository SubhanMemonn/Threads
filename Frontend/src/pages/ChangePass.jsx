import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      if (user?._id) {
        const { data } = await axios.put(`/api/users/password/${user._id}`, {
          oldPassword,
          newPassword,
        });
        if (data) {
          toast.success(data.message);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      <div className="sm:w-[90%] flex justify-center lg:ml-4 shadow-md pt-8">
        <div className="rounded shadow px-6 w-full">
          <form className="pb-6 w-full">
            <label className="font-semibold text-gray-700 block pb-1">
              Old Password
            </label>
            <div className="flex mb-4">
              <input
                className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border h-12 mb-6"
                type="text"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <label className="font-semibold text-gray-700 block pb-1 ">
              New Password
            </label>
            <div className="flex mb-4">
              <input
                className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border h-12"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <p className="text-center mt-8">
              <button
                onClick={() => navigate("/profile")}
                className="text-xl text-white bg-slate-900 px-6 py-2 rounded-md mr-4 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={submitHandler}
                className="text-xl text-white bg-slate-900 px-6 py-2 rounded-md hover:bg-zinc-800"
              >
                Save
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
