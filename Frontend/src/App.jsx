import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Leftbar from "./components/Leftbar";
import Sidebar from "./components/Sidebar";

import axios from "axios";
import ChangePass from "./pages/ChangePass";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import UserPage from "./pages/UserPage";
import UpdateProfile from "./pages/updateProfile";
import { LoadUserFailure, LoadUserSuccess } from "./reducer/userReducer";
function App() {
  const { isAuthenticated } = useSelector((store) => store.userReducer);

  const dispatch = useDispatch();
  const currentUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");

      dispatch(LoadUserSuccess(data.data));
      // console.log(data.data);
    } catch (error) {
      // toast.error("Login Again");
      dispatch(LoadUserFailure());
    }
  };
  useEffect(() => {
    currentUser();
  }, [dispatch]);

  return (
    <div
      className={`${isAuthenticated} && " bg-black block overflow-x-hidden"`}
    >
      <Router>
        {isAuthenticated && <Header />}
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Home />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to={"/"} />}
          />

          <Route
            path="/update"
            element={
              isAuthenticated ? <UpdateProfile /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/:username/:pid"
            element={isAuthenticated ? <PostPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/:username"
            element={isAuthenticated ? <UserPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/Search"
            element={isAuthenticated ? <Search /> : <Navigate to={"/"} />}
          />
          <Route
            path="/Create-post"
            element={isAuthenticated ? <CreatePost /> : <Navigate to={"/"} />}
          />
          <Route
            path="/change-password"
            element={isAuthenticated ? <ChangePass /> : <Navigate to={"/"} />}
          />
        </Routes>
        {isAuthenticated && <Leftbar />}
        {isAuthenticated && <Footer />}
        <Toaster position="top-center" />
      </Router>
    </div>
  );
}

export default App;
