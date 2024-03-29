import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userProfileSuccess } from "../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../redux/api/userAPI";
import { Button, Spinner } from "flowbite-react";
const updateProfile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePic: "",
  });
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  // console.log(user);
  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfile(reader.result);
          setInputs({ ...inputs, profilePic: reader.result });
        }
      };
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await updateUser({ userId: user?._id, inputs });
    // console.log(data);
    if (data.success === true) {
      setLoading(false);
      dispatch(userProfileSuccess(data.data));
      toast.success(data.message);
      navigate("/profile");
    } else {
      setLoading(false);
      toast.error("Failed to updated");
    }
  };
  return (
    <div className="lg:w-[48vw] lg:mx-auto w-[98%] md:w-[60vw] md:ml-[30vw] bg-zinc-950 pt-8 min-h-[100vh] pb-24">
      <div>
        <div className="w-full px-4 sm:px-6 lg:px-8 shadow-md border-b-2 border-slate-600">
          <div className="flex justify-between"></div>

          <span className="text-gray-600 text-4xl font-semibold">
            Update Profile Edits
          </span>
          <div className="flex justify-between items-center my-2">
            <img
              className="w-48 h-48 rounded-full"
              src={
                profile
                  ? profile
                  : user?.profilePic ||
                    "https://cdnb.artstation.com/p/assets/images/images/008/461/423/smaller_square/ivan-smolin-default-avatar.jpg?1512944873"
              }
              alt=""
            />
            <div
              href="#"
              className="mt-2 sm:text-md font-bold text-white bg-gray-700 rounded-full sm:px-5 sm:py-2 hover:bg-gray-800 text-sm whitespace-nowrap p-2"
            >
              <label className=" hover:text-white ">
                {!user.profilePic ? "Upload profile" : "Change Avatar"}
                <input
                  type="file"
                  class="hidden"
                  onChange={changeImageHandler}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full lg:ml-4 shadow-md pt-8">
          <div className="rounded  shadow px-6">
            <form className="pb-6">
              <label className="font-semibold text-gray-700 block pb-1">
                Name
              </label>
              <div className="flex mb-4">
                <input
                  className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border"
                  type="text"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </div>
              <label className="font-semibold text-gray-700 block pb-1">
                username
              </label>
              <div className="flex mb-4">
                <input
                  className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border"
                  type="text"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
              <label className="font-semibold text-gray-700 block pb-1">
                Bio
              </label>
              <div className="flex mb-4">
                <input
                  className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border"
                  type="text"
                  value={inputs.bio}
                  onChange={(e) =>
                    setInputs({ ...inputs, bio: e.target.value })
                  }
                />
              </div>
              <label className="font-semibold text-gray-700 block pb-1">
                Email
              </label>
              <div className="flex mb-4">
                <input
                  className="border-1 px-4 py-2 w-full bg-transparent text-white  rounded-md shadow-lg border-slate-500 border"
                  type="text"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                />
              </div>
              <Link
                to={"/change-password"}
                className="text-white whitespace-nowrap text-xl hover:text-slate-500 hover:font-bold text-center"
              >
                Change Password
              </Link>
              <center>
                <Button
                  onClick={submitHandler}
                  disabled={loading}
                  color="dark"
                  outline
                  className="w-26"
                >
                  {loading ? <Spinner /> : "Save"}
                </Button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateProfile;
