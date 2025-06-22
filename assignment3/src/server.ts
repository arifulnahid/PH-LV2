import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const PORT: number = parseInt(process.env.PORT as any) ?? 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI_LOCAL as string);
    console.log("mongoose connected with mongodb database");
    server = app.listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
