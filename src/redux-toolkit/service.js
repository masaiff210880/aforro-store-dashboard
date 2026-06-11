import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const avidusApi = createApi({
  reducerPath: "avidusApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ q } = {}) => {
        const config = { url: "/users" };

        if (q) {
          config.params = { q };
        }

        return config;
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = avidusApi;
