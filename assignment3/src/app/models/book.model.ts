import { model, Schema } from "mongoose";
import { IBook } from "../inerfaces/book.interface";
import { IBorrow } from "../inerfaces/borrow.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.methods.getBorrows = async function (): Promise<IBorrow[]> {
  return await model("Borrow").find({ book: this._id });
};

bookSchema.statics.withBorrow = async function () {
  const result = await this.aggregate([
    {
      $lookup: {
        from: "borrows",
        localField: "_id",
        foreignField: "book",
        as: "borrows",
      },
    },
  ]);

  return result;
};

export const Book = model<IBook>("Book", bookSchema);
