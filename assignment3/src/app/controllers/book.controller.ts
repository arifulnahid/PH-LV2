import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { QueryBuilder } from "../query/queryBuilder";
import { IBook } from "../inerfaces/book.interface";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Book created successfully", book });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Book create unsuccessful", error });
  }
});

bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    let query = new QueryBuilder<IBook>(Book, req.query)
      .filter()
      .sort()
      .limit();
    let books = await query.exec();

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Books retrive faild",
      error,
    });
  }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const q = req.query;
  try {
    let book;
    if (q.borrow) book = await Book.withBorrow();
    else book = await Book.find({ _id: req.params.bookId });

    res.status(400).json({
      success: false,
      message: "Book retrived successful",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Books retrive faild",
      error,
    });
  }
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    res.status(200).json({
      success: false,
      message: "Book Update successful",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Book Update faild",
      error,
    });
  }
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    console.log(book);
    res.status(200).json({
      success: false,
      message: "Book delete successful",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Book Delete faild",
      error,
    });
  }
});
