import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./modules/auth/authRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";


const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

