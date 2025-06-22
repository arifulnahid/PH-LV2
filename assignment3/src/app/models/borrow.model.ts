import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../inerfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, "Quantity must be at least 1."],
      required: true,
    },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.path("book").validate({
  validator: async (value: Types.ObjectId) => {
    try {
      const bookExists = await model("Book").exists({ _id: value });
      return bookExists;
    } catch (error) {
      return false;
    }
  },
  message: "Book with ID {VALUE} does not exist.",
});

borrowSchema.pre("save", async function (next) {
  try {
    const book = await model("Book").findById(this.book);

    if (!book.available || this.quantity <= 0 || this.quantity > book.copies) {
      let error = new Error(`Book is available only  ${book.copies}`);
      error.name = "ValidationError";
      error.message = `Book is available only  ${book.copies}`;

      return next(error);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

borrowSchema.post("save", async function (doc: IBorrow, next) {
  try {
    const book = await model("Book").findById(doc.book);

    book.copies -= doc.quantity;
    if (book.copies == 0) book.available = false;
    book.save();

    next();
  } catch (error: any) {
    next(error);
  }
});

export const Borrow = model("Borrow", borrowSchema);
