import { TableRow, TableCell } from "@/components/ui/table";
import dayjs from "dayjs";

export default function BorrowItem({ borrow }: any) {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{borrow.book.title}</TableCell>
        <TableCell>{borrow.book.isbn}</TableCell>
        <TableCell>{borrow.totalQuantity}</TableCell>
        <TableCell>{dayjs(borrow.dueDate).toString()}</TableCell>
        {/* <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <BookPlus /> Borrow
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell> */}
      </TableRow>
    </>
  );
}
