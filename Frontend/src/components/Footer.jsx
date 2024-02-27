import { FaSignOutAlt } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/userAPI";
import { LogoutUserSuccess } from "../redux/reducer/userReducer";
import toast from "react-hot-toast";
const Footer = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const logOut = async () => {
    const { data } = await logout();
    if (data) {
      dispatch(LogoutUserSuccess());
      toast.success(data.message);
    }
  };
  return (
    <div className="w-full h-14 bg-black border-t-2 border-slate-500 md:hidden flex justify-between px-4 items-center fixed bottom-0">
      <Link
        to={"/"}
        className="cursor-pointer text-4xl text-white hover:opacity-75"
      >
        <LuHome />
      </Link>
      <Link
        to={"/search"}
        className="text-4xl cursor-pointer text-white hover:opacity-75"
      >
        <IoSearch />
      </Link>
      <Link
        to={"/create-post"}
        className="text-4xl text-white cursor-pointer hover:opacity-75"
      >
        <GrAdd />
      </Link>
      <Link
        to={"/profile"}
        className="text-4xl cursor-pointer text-white hover:opacity-75"
      >
        <RxAvatar />
      </Link>
      <button
        className="cursor-pointer text-4xl text-white hover:opacity-75"
        onClick={logOut}
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Footer;
