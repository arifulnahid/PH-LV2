import { Document } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { bookSchemaType } from "../models/book.model";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBookWithBorrow extends IBook {
  borrows?: IBorrow[];
}
