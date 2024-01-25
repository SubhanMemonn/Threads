import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost,
    replyToPost
} from "../controllers/post.controller.js"
import upload from "../middlewares/multer.middleware.js";

const router = express.Router()

router.get("/feed", verifyJWT, getFeedPosts);

router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", verifyJWT, createPost);
router.delete("/:id", verifyJWT, deletePost);
router.put("/like/:id", verifyJWT, likeUnlikePost);
router.put("/reply/:postId", verifyJWT, replyToPost);

export default router;