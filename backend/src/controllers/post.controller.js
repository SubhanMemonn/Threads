import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary, { deleteOnCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
    const { postBy, text } = req.body;
    if (!text) {
        throw new ApiError(400, "Capions field are required")
    }
    const postLocalPath = req.body.post;
    let post;
    if (postLocalPath) {
        post = await uploadOnCloudinary(postLocalPath);
        if (!post.url) {
            throw new ApiError(400, "Error while uploading post")
        }
    }

    const user = await User.findById(postBy);
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    if (user._id.toString() !== req.user?._id.toString()) {
        throw new ApiError(404, "Unauthorized to create post")
    }

    const maxLength = 500;
    if (text.length > maxLength) {
        throw new ApiError(400, `Text must be less than ${maxLength}`)
    }

    const newPost = await Post.create({
        postBy,
        post: post?.url || "",
        text,
    })
    if (!newPost) {
        throw new ApiError(500, "Something went wrong while uploading")
    }

    return res.status(200)
        .json(new ApiResponse(200, newPost, "Post uploaded"))
});

const getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        throw new ApiError(404, "Invalid ID")
    }
    const post = await Post.findById(id).populate("postBy");
    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, post, "Post fetched"))
});

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    if (!post.postBy.equals(req.user?._id)) {
        throw new ApiError(400, "Unauthorized Request")
    }

    if (post.post) {
        const postId = post.post.split("/").pop().split(".")[0];
        await deleteOnCloudinary(postId)
    }
    const removePost = await Post.findByIdAndDelete(post?._id)
    if (!removePost) {
        throw new ApiError(500, "Something went wrong while delete post")
    }
    return res.status(200)
        .json(new ApiResponse(200, {}, "Deleted Successfully"))
});

const likeUnlikePost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    };

    const likeExisted = post.likes.includes(req.user?._id);

    if (likeExisted) {
        await Post.findByIdAndUpdate(post._id, {
            $pull: {
                likes: new mongoose.Types.ObjectId(req.user?._id)
            }
        }, { new: true })
        return res.status(200).json(new ApiResponse(200, {}, "Post Unliked Successfully"))
    } else {
        await Post.findByIdAndUpdate(post._id, {
            $push: {
                likes: new mongoose.Types.ObjectId(req.user?._id)
            }
        }, { new: true })
        return res.status(200).json(new ApiResponse(200, {}, "Post liked Successfully"))
    }
});

const replyToPost = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { postId } = req.params;
    const userId = req.user?._id;
    const userProfilePic = req.user?.profilePic;
    const username = req.user?.username;

    if (!isValidObjectId(postId)) {
        throw new ApiError(404, "Post not found")
    };

    console.log(text);
    if (!text) {
        throw new ApiError(404, "Text field are required")
    }
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    const comment = await Post.findByIdAndUpdate(post?._id, {
        $push: {
            comments: [
                {
                    userId,
                    text,
                    userProfilePic,
                    username,
                }
            ],
        }
    })
    if (!comment) {
        throw new ApiError(404, "Something went wrong while upload comment")
    }
    return res.status(200)
        .json(new ApiResponse(200, comment, "Comment added"))
});

const getTodayFeedPosts = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const following = user.following;

    const feedPost = await Post.find({ postBy: { $in: following }, createdAt: { $gte: today } }).populate("postBy").sort({ createdAt: -1 });
    if (!feedPost.length) {
        throw new ApiError(400, "No post")
    }
    return res.status(200)
        .json(new ApiResponse(200, feedPost, "All Feed post fetched"))
});
const getOldFeedPosts = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const following = user.following;

    const feedPost = await Post.find({ postBy: { $in: following }, createdAt: { $lte: today } }).populate("postBy").sort({ createdAt: -1 });
    if (!feedPost.length) {
        throw new ApiError(400, "No post")
    }
    return res.status(200)
        .json(new ApiResponse(200, feedPost, "All Feed post fetched"))
});
const getUserPosts = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({
        username
    });
    if (!user) { throw new ApiError(404, "User not found") }
    const posts = await Post.find({ postBy: user?._id }).populate("postBy").sort({ createdAt: -1 });
    if (!posts) {
        throw new ApiError(500, "Somethin went wrong while fetching user posts ")
    }
    return res.status(200)
        .json(new ApiResponse(200, { user, posts }, "All post fetched"))
});
const getRandomPosts = asyncHandler(async (req, res) => {
    const findUser = await User.findById(req.user?._id);
    if (!findUser) {
        throw new ApiError(404, "User not found")
    }
    const post = await Post.aggregate([
        {
            $match: {
                postBy: { $ne: findUser?._id }
            }
        }, {
            $sample: {
                size: 10
            }
        }
    ])
    if (!post.length) {
        throw new ApiError(404, "No post")
    }
    const filterPosts = post.filter((post) => !findUser.following.includes(post.postBy))
    return res.status(200)
        .json(
            new ApiResponse(200, filterPosts, "Feed post fetched")
        )
})
export {
    createPost, deletePost, getTodayFeedPosts, getPost, getUserPosts, likeUnlikePost,
    replyToPost, getRandomPosts, getOldFeedPosts
};

