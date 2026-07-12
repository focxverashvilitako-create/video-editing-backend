import {
  getGoogleUser,
  handleGoogleLogin
} from "./oauthService.js";

import pool from "../../config/db.js";
import jwt from "jsonwebtoken";


// Google callback

export const googleCallback = async (req, res) => {

  console.log("1. CALLBACK ENTERED");

  try {

    console.log("QUERY:", req.query);

    const { code } = req.query;

    console.log("CODE:", code);


    const googleUser = await getGoogleUser(code);


    const result = await handleGoogleLogin(
      googleUser
    );


    res.json(result);


  } catch(error) {

    console.log("ERROR:", error);

    res.status(400).json({
      message: error.message
    });

  }

};



// Google registration completion (phone)

export const completeGoogleRegister = async (req, res) => {

  try {

    const {
      pendingId,
      phone
    } = req.body;



    // ვიღებთ დროებით Google მომხმარებელს

    const pendingResult = await pool.query(
      `
      SELECT *
      FROM pending_social_users
      WHERE id = $1
      `,
      [
        pendingId
      ]
    );


    if (pendingResult.rows.length === 0) {

      return res.status(404).json({
        message: "Pending user not found"
      });

    }


    const googleUser = pendingResult.rows[0];



    // ვქმნით ნამდვილ user-ს
    if(!phone){
 return res.status(400).json({
   message:"Phone number required"
 });
}

    const userResult = await pool.query(
      `
      INSERT INTO users
      (
        first_name,
        last_name,
        email,
        phone,
        avatar,
        registration_completed
      )
      VALUES
      ($1,$2,$3,$4,$5, true)
      RETURNING *
      `,
      [
        googleUser.first_name,
        googleUser.last_name,
        googleUser.email,
        phone,
        googleUser.avatar
      ]
    );


    const user = userResult.rows[0];



    // ვინახავთ Google კავშირს

    await pool.query(
      `
      INSERT INTO social_accounts
      (
        user_id,
        provider,
        provider_user_id
      )
      VALUES
      ($1,$2,$3)
      `,
      [
        user.id,
        googleUser.provider,
        googleUser.provider_user_id
      ]
    );



    // ვშლით დროებით მონაცემს

    await pool.query(
      `
      DELETE FROM pending_social_users
      WHERE id = $1
      `,
      [
        pendingId
      ]
    );



    // ვქმნით JWT-ს

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );



    res.json({

      message: "Registration completed",

      token,

      user

    });



  } catch(error) {

    console.log(error);

    res.status(400).json({
      message:error.message
    });

  }

};