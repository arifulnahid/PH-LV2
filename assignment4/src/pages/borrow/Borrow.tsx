import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BorrowItem from "./BorrowItem";
import { useGetBorrowQuery } from "@/redux/api/borrowApi";

export default function Borrow() {
  const { data, isLoading, isError } = useGetBorrowQuery(undefined);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Filter borrow..."
            value={""}
            onChange={() => {}}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Due Date</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isError && !isLoading && data?.data?.length ? (
              data.data.map((borrow: any) => (
                <BorrowItem key={borrow._id} borrow={borrow} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {isLoading ? "Loading..." : "No Resut"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}
