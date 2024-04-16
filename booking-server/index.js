import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();
const PORT = process.env.PORT_URL || 5000;
const app = express();

//database connection
mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.error("MongoDB connection error", err));

//middlewares
app.use(cors());

app.use(express.json());

// app.use("/", (req, res, next) => {
//   res.send("Hello from the server");
//   next();
// });

app.use("/api", roomRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
