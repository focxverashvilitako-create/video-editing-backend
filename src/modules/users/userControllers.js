import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../config/db.js";


export const profile = (req, res) => {
  res.json({
    message: "profile works",
    user: req.user
  });
};


export const dashboard = (req, res) => {
  res.json({
    message: "dashboard works",
    user: req.user
  });
};