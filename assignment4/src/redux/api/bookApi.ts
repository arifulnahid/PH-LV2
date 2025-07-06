import { api } from "./api";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    getBook: build.query({
      query: (id) => `/books/${id}`,
      providesTags: (__, _, id) => ["Book", { id, type: "Book" }],
    }),
    addBook: build.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: build.mutation({
      query: ({ id, patch }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (__, _, { id }) => ["Book", { id, type: "Book" }],
    }),
    deleteBook: build.mutation({
      query: (id) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
