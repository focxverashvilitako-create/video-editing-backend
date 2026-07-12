import pool from "../../config/db.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../../.env" });


console.log("OAUTH SERVICE LOADED");

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET ? "exists" : "missing",
  redirect: process.env.GOOGLE_REDIRECT_URI
});


const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI
});



export const getGoogleUser = async (code) => {

  console.log("CODE RECEIVED:", code);


  const { tokens } = await client.getToken(code);


  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID
  });


  const payload = ticket.getPayload();


  return {
    googleId: payload.sub,
    email: payload.email,
    firstName: payload.given_name,
    lastName: payload.family_name,
    avatar: payload.picture
  };

};




export const handleGoogleLogin = async (googleUser) => {


  const {
    googleId,
    email,
    firstName,
    lastName,
    avatar
  } = googleUser;



  // ვამოწმებთ უკვე არის თუ არა user

  let result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [
      email
    ]
  );


  let user = result.rows[0];



  // თუ არსებობს პირდაპირ login

  if(user){


    const token = jwt.sign(
      {
        id:user.id,
        email:user.email,
        role:user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1d"
      }
    );


    return {
      token,
      user
    };

  }



  // ახალი Google user -> დროებით ვინახავთ

  result = await pool.query(
    `
    INSERT INTO pending_social_users
    (
      provider,
      provider_user_id,
      first_name,
      last_name,
      email,
      avatar
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING id
    `,
    [
      "google",
      googleId,
      firstName || null,
      lastName || null,
      email,
      avatar || null
    ]
  );



  const pendingId = result.rows[0].id;



  return {
    needsPhone:true,
    pendingId
  };

};