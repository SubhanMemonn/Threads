import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    post: {
        type: String,

    },
    postBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    text: {
        type: String,
        maxLength: 500,
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    comments: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            text: {
                type: String,
                required: true
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
            },
        }
    ],


}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema)