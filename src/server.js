import "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/authRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";
import courseRoutes from "./modules/courses/courseRoutes.js";
import lessonRoutes from "./modules/lessons/lessonRoutes.js";
import purchaseRoutes from "./modules/purchases/purchaseRoutes.js";
import progressRoutes from "./modules/progress/progressRoutes.js";
import liveGroupsRoutes from "./modules/livegroups/liveGroupsRoutes.js";
import enrollmentRoutes from "./modules/enrollment/enrollmentRoutes.js";

const app = express();
app.use(cors());




app.use(express.json());
app.use("/enrollments", enrollmentRoutes);
app.use("/lessons", lessonRoutes);
app.use("/courses", courseRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/progress", progressRoutes);
app.use("/livegroups", liveGroupsRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

