import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/posts/",
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (postId) => `${postId}`,
      providesTags: ["posts"],
    }),
    userPosts: builder.query({
      query: (username) => `user/${username}`,
      providesTags: ["posts"],
    }),
    newFeed: builder.query({
      query: () => "newfeed",
      providesTags: ["posts"],
    }),
    oldFeed: builder.query({
      query: () => "oldfeed",
      providesTags: ["posts"],
    }),
    uploadPost: builder.mutation({
      query: ({ postBy, post, text }) => ({
        url: "create",
        method: "POST",
        body: { postBy, post, text },
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: postId,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    toggleLike: builder.mutation({
      query: (postId) => ({
        url: `like/${postId}`,
        method: "PUT",
      }),
      invalidatesTags: ["posts"],
    }),
    comment: builder.mutation({
      query: ({ postId, text }) => ({
        url: `reply/${postId}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});
export const {
  useGetPostQuery,
  useUserPostsQuery,
  useDeletePostMutation,
  useNewFeedQuery,
  useOldFeedQuery,
  useUploadPostMutation,
  useToggleLikeMutation,
  useCommentMutation,
} = postAPI;
