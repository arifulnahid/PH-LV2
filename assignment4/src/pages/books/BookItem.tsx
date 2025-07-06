import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableRow, TableCell } from "@/components/ui/table";
import { useDeleteBookMutation } from "@/redux/api/bookApi";
import { BookPlus, Ellipsis, Pencil, Trash } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function BookItem({ book }: any) {
  const [bookDelete] = useDeleteBookMutation();

  const bookDeleteHandler = () => {
    toast.promise(bookDelete(book._id), {
      loading: "Loading...",
      success: () => {
        return "Book Deleted successfully";
      },
      error: "Error Happened",
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{book.title}</TableCell>
        <TableCell>{book.author}</TableCell>
        <TableCell>{book.genre}</TableCell>
        <TableCell>{book.isbn}</TableCell>
        <TableCell>{book.copies}</TableCell>
        <TableCell>{book.available ? "available" : "unavailable"}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to={`/borrow/add/${book._id}`}>
                <DropdownMenuItem>
                  <BookPlus /> Borrow
                </DropdownMenuItem>
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <DropdownMenuItem>
                  <Pencil />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={bookDeleteHandler}>
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
