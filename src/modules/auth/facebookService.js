import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const getFacebookUser = async (code) => {

  // ეს ნაწილი მერე შეიცვლება Facebook API-ით


  return {
    facebookId: "facebook-test-id",
    email: "facebook@test.com",
    firstName: "Facebook",
    lastName: "User",
    avatar: null,
    phone: null
  };

};



export const handleFacebookLogin = async (facebookUser) => {

  const {
    facebookId,
    email,
    firstName,
    lastName,
    avatar,
    phone
  } = facebookUser;



  // ვამოწმებთ უკვე არსებობს თუ არა user

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



  // თუ Facebook-მა phone მოგვცა

  if(phone){


    result = await pool.query(
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
      ($1,$2,$3,$4,$5,true)
      RETURNING *
      `,
      [
        firstName,
        lastName,
        email,
        phone,
        avatar
      ]
    );


    user = result.rows[0];



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
        "facebook",
        facebookId
      ]
    );



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





  // თუ phone არ აქვს Facebook-ს

  result = await pool.query(
    `
    INSERT INTO pending_social_users
    (
      provider,
      provider_user_id,
      first_name,
      last_name,
      email,
      avatar,
      expires_at
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,NOW() + INTERVAL '15 minutes')
    RETURNING id
    `,
    [
      "facebook",
      facebookId,
      firstName,
      lastName,
      email,
      avatar
    ]
  );



  return {
    needsPhone:true,
    pendingId:result.rows[0].id
  };


};