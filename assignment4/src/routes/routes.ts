import App from "@/App";
import BookEdit from "@/pages/books/BookEdit";
import AddBorrow from "@/pages/borrow/AddBorrow";
import Borrow from "@/pages/borrow/Borrow";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        index: true,
        path: "/books",
        Component: Home,
      },
      {
        path: "books/edit/:id",
        Component: BookEdit,
      },
      {
        path: "borrow",
        Component: Borrow,
      },
      {
        path: "borrow/add/:bookId",
        Component: AddBorrow,
      },
    ],
  },
]);
