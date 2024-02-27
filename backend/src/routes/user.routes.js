import express from "express";
import {
    followUnFollowUser,
    getUserProfile,
    loginUser,
    logoutUser,
    signupUser,
    updateUser,
    getSuggestedUsers,
    PrivatedAccount,
    changePassword,
    getCurrentUser,
    refreshAccessToken,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", verifyJWT, getSuggestedUsers);
router.post("/signup", signupUser
);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", verifyJWT, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", verifyJWT, updateUser);
router.put("/password/:id", verifyJWT, changePassword);
router.put("/freeze", verifyJWT, PrivatedAccount,);
router.get("/me", verifyJWT, getCurrentUser,);
router.post("/refresh-token", refreshAccessToken);

export default router;
