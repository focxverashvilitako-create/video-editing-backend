import "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
console.log("ENV TEST:", {
  client: process.env.GOOGLE_CLIENT_ID,
  redirect: process.env.GOOGLE_REDIRECT_URI
});
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/authRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";

const app = express();
app.use(cors());



app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

