import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users/",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (inputs) => ({
        url: "signup",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["users"],
    }),
    login: builder.mutation({
      query: ({ password, email }) => ({
        url: "login",
        method: "POST",
        body: { password, email },
      }),
      providesTags: ["users"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      providesTags: ["users"],
    }),
    suggestedUser: builder.query({
      query: () => "suggested",
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, inputs }) => ({
        url: `update/${userId}`,
        method: "PUT",
        body: inputs,
      }),
      invalidatesTags: ["users"],
    }),
    changePassword: builder.mutation({
      query: ({ userId, oldPassword, newPassword }) => ({
        url: `password/${userId}`,
        method: "PUT",
        body: { oldPassword, newPassword },
      }),
      providesTags: ["users"],
    }),
    toggleFollow: builder.mutation({
      query: (userId) => ({
        url: `follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    search: builder.query({
      query: (user) => `profile/${user}`,
      providesTags: ["users"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useSuggestedUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useToggleFollowMutation,
  useSearchQuery,
} = userAPI;
