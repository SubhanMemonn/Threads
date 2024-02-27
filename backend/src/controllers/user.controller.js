import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateAccessAndRefereshTokens from "../utils/generateAccessAndRefereshTokens.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { COOKIE_OPTIONS } from "../constants.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import Jwt from "jsonwebtoken";
import { deleteOnCloudinary } from "../utils/cloudinary.js";
const signupUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        throw new ApiError(400, "All fields are required")

    };
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (user) {
        throw new ApiError(400, "User Already Exists");
    };

    const newUser = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password
    });

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(newUser?._id)

    const createdUser = await User.findById(newUser?._id)
        .select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while signup user")

    }

    return res.status(201)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        .json(new ApiResponse(201, createdUser, "User Signup Successfully"))
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!email && !username) {
        throw new ApiError(400, "Username or Email is required")
    };

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (!user) {
        throw new ApiError(400, "User does not exists")
    };

    const checkPassword = await user.isPasswordCorrect(password);
    if (!checkPassword) {
        throw new ApiError(401, "Wrong Password")
    };

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user?._id);

    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken");

    return res.status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        .json(new ApiResponse(200, loggedInUser, "LoggedIn Successfully"))
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: 1
        }
    },
        { new: true })

    return res.status(200)
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .clearCookie("refreshToken", COOKIE_OPTIONS)
        .json(new ApiResponse(200, {}, "User Logged Out"))
});
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return res.status(200)
        .json(new ApiResponse(200, user, "User Find"))
})
const followUnFollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        throw new ApiError(404, "Invalid ID")
    }
    const currentUser = await User.findById(req.user?._id);

    const userToModify = await User.findById(id);

    if (id.toString() === currentUser?._id) {
        throw new ApiError(400, "You Cannot Follow yourself")
    }
    const isFollowing = currentUser.following.includes(userToModify?._id)
    if (isFollowing) {
        const me = await User.findByIdAndUpdate(req.user?._id, {
            $pull: {
                following: new mongoose.Types.ObjectId(id)
            }
        }, { new: true })
        await User.findByIdAndUpdate(id, {
            $pull: {
                followers: new mongoose.Types.ObjectId(req.user?._id)
            }
        }, { new: true })
        return res.status(200)
            .json(new ApiResponse(200, me, "Unfollow successfully"))
    } else {
        const me = await User.findByIdAndUpdate(req.user?._id, {
            $push: {
                following: new mongoose.Types.ObjectId(id)
            }
        }, { new: true })
        await User.findByIdAndUpdate(id, {
            $push: {
                followers: new mongoose.Types.ObjectId(req.user?._id)
            }
        }, { new: true })
        return res.status(200)
            .json(new ApiResponse(200, me, "Following successfully"))
    }


});

const updateUser = asyncHandler(async (req, res) => {
    const { name, email, username, bio } = req.body;

    if (!name || !email || !username) {
        throw new ApiError(400, "All fiels are required")
    };

    const profilePic = req.body.profilePic;
    if (profilePic) {
        if (req.user.profilePic) {
            await deleteOnCloudinary(req.user?.profilePic)
        }
        var uploadProfilePic = await uploadOnCloudinary(profilePic)

        if (!uploadProfilePic.url) {
            throw new ApiError(400, "Error While Uploading Profile Pic")
        }
    }


    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            name,
            email,
            username,
            bio,
            profilePic: uploadProfilePic?.url
        }
    }, { new: true }).select("-password -refreshToken")

    // Find all posts that this user replied and update username and userProfilePic fields
    const userComments = await Post.exists({ "comments.userId": user?._id });
    if (userComments) {

        const updatedComments = await Post.updateMany(
            { "comments.userId": user?._id },
            {
                $set: {
                    "comments.$.userProfilePic": user?.profilePic,
                    "comments.$.username": user?.username,
                }
            }, { arrayFilters: [{ "comments.userId": user?._id }] }
        )
        if (!updatedComments) {
            throw new ApiError(500, "Somenthing went wrong while Updated")
        }
    }
    return res.status(200)
        .json(
            new ApiResponse(200, user, "Account details update successfully")
        )
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!newPassword || !oldPassword) {
        throw new ApiError(400, "Password field empty")
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200,
            {},
            "Password change successfully"))
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { query } = req.params;
    let user;
    try {
        if (isValidObjectId(query)) {

            user = await User.findById(query);
        } else {
            user = await User.find({
                username: {
                    $regex: query,
                    $options: "i"
                }
            });

        }
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        return res.status(200)
            .json(new ApiResponse(200,
                user,
                "User fetched successfully"))

    } catch (error) {
        throw new ApiError(500, error?.message || "Something Went Wrong")
    }
});

const getSuggestedUsers = asyncHandler(async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user?._id);
        const userFollowedByYou = await User.findById(req.user?._id).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            }, {
                $sample: {
                    size: 10
                }
            },
        ])
        const filteredUser = users.filter((user) => !userFollowedByYou.following.includes(user._id));
        const suggestedUsers = filteredUser.slice(0, 4);

        return res.status(200)
            .json(new ApiResponse(200, suggestedUsers, "Suggestion User Fetched"))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong")
    }
})

const PrivatedAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPrivated = user.isPrivated === false;

    if (isPrivated) {
        await User.findByIdAndUpdate(user?._id, {
            $set: {
                isPrivated: true
            }
        }, { new: true })
    } else {
        await User.findByIdAndUpdate(user?._id, {
            $set: {
                isPrivated: false
            }
        }, { new: true })
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Updated"))
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodded = Jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodded?._id);
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
        const { accessToken } = await generateAccessAndRefereshTokens(user?._id)

        return res.status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            // .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json(
                new ApiResponse(200,
                    { accessToken, refreshToken },
                    "Access Token Refreshed")
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Invalid refresh token")
    }
})
export {
    signupUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    changePassword,
    getUserProfile,
    getSuggestedUsers,
    PrivatedAccount,
    refreshAccessToken,
    getCurrentUser
};