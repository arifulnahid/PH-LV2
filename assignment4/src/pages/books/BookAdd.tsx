import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
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
import { useAddBookMutation } from "@/redux/api/bookApi";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function BookAdd() {
  const [open, setOpen] = useState(false);
  const [addBook] = useAddBookMutation();
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

  const modalOpen = () => {
    setOpen(!open);
  };

  const onSubmit = async (values: BookFormData) => {
    const b = addBook(values);

    toast.promise(b, {
      loading: "Loading...",
      success: ({ data }) => {
        if (data.success) {
          setOpen(false);
          form.reset();
          return "Book addedd successfully";
        }
        return "Book add faild";
      },
      error: "Error Happened",
    });
  };

  return (
    <Dialog open={open} onOpenChange={modalOpen}>
      <DialogTrigger className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
        Add Task
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Genre</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
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
                )}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
