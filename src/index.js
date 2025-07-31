import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./env",
});
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR in App.on :", error);
    });
    const port = process.env.PORT || 8000;
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed", err);
  });
