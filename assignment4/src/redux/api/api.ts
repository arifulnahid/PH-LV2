import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-api-eight.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: ["Book", "Borrow"],
});
