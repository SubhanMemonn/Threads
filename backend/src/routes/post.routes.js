import express from "express";
import {
    createPost, deletePost, getOldFeedPosts, getPost, getRandomPosts, getTodayFeedPosts, getUserPosts, likeUnlikePost,
    replyToPost
} from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/newfeed", verifyJWT, getTodayFeedPosts);
router.get("/oldfeed", verifyJWT, getOldFeedPosts);

router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/all", verifyJWT, getRandomPosts);
router.post("/create", verifyJWT, createPost);
router.delete("/:id", verifyJWT, deletePost);
router.put("/like/:id", verifyJWT, likeUnlikePost);
router.put("/reply/:postId", verifyJWT, replyToPost);

export default router;