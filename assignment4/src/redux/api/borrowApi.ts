import { api } from "./api";

const borrowApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBorrow: build.query({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
    addBorrow: build.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),
  }),
});

export const { useGetBorrowQuery, useAddBorrowMutation } = borrowApi;
