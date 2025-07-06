import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-api-eight.vercel.app",
      "https://grand-liger-a740c1.netlify.app",
      "live-deploy-url",
    ],
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

export default app;
