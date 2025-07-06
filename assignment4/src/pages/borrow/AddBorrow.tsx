import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { borrowSchema, type BorrowFormData } from "@/schema/BorrowSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { useAddBorrowMutation } from "@/redux/api/borrowApi";
import { useGetBookQuery } from "@/redux/api/bookApi";

export default function AddBorrow() {
  const [addBorrow] = useAddBorrowMutation();
  const param = useParams();
  const { data, isLoading } = useGetBookQuery(param.bookId);
  const navigate = useNavigate();
  const form = useForm<BorrowFormData>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      book: param.bookId,
      quantity: 0,
      dueDate: undefined,
    },
  });

  const onSubmit = async (values: BorrowFormData) => {
    const b = addBorrow(values);

    toast.promise(b, {
      loading: "Loading...",
      success: ({ data }) => {
        if (data?.success) {
          form.reset();
          navigate("/borrow");
          return "Book Borrowed successfully";
        }
        throw new Error("Borrow Create Faild");
      },
      error: (err) => {
        return err.message || "Borrow Create Faild";
      },
    });
  };

  return (
    <div className="w-md mx-auto py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Add Borrow!
          </h2>
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="title"
              render={() => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" value={data?.data[0]?.title} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="mb-2"
                      type="number"
                      placeholder="Borrow Quantity"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">ISBN</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full mb-2 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            dayjs(field.value).toString()
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
