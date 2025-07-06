import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $group: {
          _id: "$book._id",
          totalQuantity: { $sum: "$quantity" },
          book: { $first: "$book" },
          dueDate: { $first: "$dueDate" },
        },
      },
      {
        $project: {
          totalQuantity: "$totalQuantity",
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          dueDate: "$dueDate",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrow retrive successfully",
      data: borrow,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Borrow retrive unsuccessful", error });
  }
});

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json({
      success: true,
      message: "Borrow created successfully",
      data: borrow,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Borrow create unsuccessful", error });
  }
});
