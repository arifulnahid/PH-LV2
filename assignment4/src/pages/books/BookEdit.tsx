import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookFormData } from "@/schema/BookSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/bookApi";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

export default function BookEdit() {
  const [updateBook] = useUpdateBookMutation();
  const param = useParams();
  const { data, isLoading } = useGetBookQuery(param.id);
  const navigate = useNavigate();
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 0,
      description: "",
      available: true,
    },
  });

  const onSubmit = async (values: BookFormData) => {
    const b = updateBook({ id: data.data[0]._id, patch: values });

    toast.promise(b, {
      loading: "Loading...",
      success: ({ data }) => {
        if (data.success) {
          form.reset();
          navigate("/");
          return "Book Edited successfully";
        }
        return "Book Edit Faild";
      },
      error: "Error Happened",
    });
  };

  useEffect(() => {
    if (data?.success) {
      const { title, author, genre, isbn, copies, description, available } =
        data.data[0];

      form.reset({
        title,
        author,
        genre,
        isbn,
        copies,
        description,
        available,
      });
    }
  }, [data]);

  return (
    <div className="w-md mx-auto py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">Edit Book!</h2>
        </div>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Book Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Author</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Book Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">ISBN</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Book ISBN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mt-2">Genre</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="NON-FICTION">
                            Non-Fiction
                          </SelectItem>
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Copies</FormLabel>
                  <FormControl>
                    <Input
                      className="mb-2"
                      type="number"
                      placeholder="Available Copies"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="mb-2"
                      placeholder="Description of book"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">Available</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="mb-2"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id={field.name}
                    />
                  </FormControl>
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
