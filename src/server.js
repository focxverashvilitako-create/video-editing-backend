import "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/authRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";
import courseRoutes from "./modules/courses/courseRoutes.js";
import courseSectionsRoutes from "./modules/coursesections/courseSectionsRoutes.js";
import lessonRoutes from "./modules/lessons/lessonRoutes.js";
import purchaseRoutes from "./modules/purchases/purchaseRoutes.js";
import progressRoutes from "./modules/progress/progressRoutes.js";
import liveGroupsRoutes from "./modules/livegroups/liveGroupsRoutes.js";
import enrollmentRoutes from "./modules/enrollment/enrollmentRoutes.js";
import galleryRoutes from "./modules/gallery/galleryRoutes.js";
import lessonResourcesRoutes from "./modules/lessonresources/lessonResourcesRoutes.js";
import lectureRecordingsRoutes from "./modules/lecturerecordings/lectureRecordingsRoutes.js";
import syllabusRoutes from "./modules/syllabus/syllabusRoutes.js";
import settingsRoutes from "./modules/settings/settingsRoutes.js";
import contactMessagesRoutes from "./modules/contactmessages/contactMessagesRoutes.js"; 
import liveGroupMembersRoutes from "./modules/livegroupmembers/liveGroupMembersRoutes.js";
const app = express();
app.use(cors());




app.use(express.json());
app.use("/enrollments", enrollmentRoutes);
app.use("/lessons", lessonRoutes);
app.use("/courses", courseRoutes);
app.use("/coursesections", courseSectionsRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/progress", progressRoutes);
app.use("/livegroups", liveGroupsRoutes);
app.use("/gallery", galleryRoutes);
app.use("/lessonresources", lessonResourcesRoutes);
app.use("/lecturerecordings", lectureRecordingsRoutes);
app.use("/syllabus", syllabusRoutes);
app.use("/settings", settingsRoutes);
app.use("/contactmessages", contactMessagesRoutes);
app.use("/livegroupmembers", liveGroupMembersRoutes);
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

