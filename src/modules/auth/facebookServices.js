import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


export const getFacebookUser = async (code) => {

  const tokenURL = `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`;

  const tokenResponse = await fetch(tokenURL);

  const tokenData = await tokenResponse.json();
  if(!tokenResponse.ok){

    throw new Error(
      tokenData.error?.message || "Facebook token error"
    );

  }





  const userURL =

  `https://graph.facebook.com/v23.0/me?fields=id,first_name,last_name,email,picture&access_token=${tokenData.access_token}`;

  const userResponse = await fetch(userURL);

  const userData = await userResponse.json();
  
  if (!userResponse.ok) {
  throw new Error(
    userData.error?.message || "Facebook user error"
  );
}

if (!userData.email) {
  throw new Error("Facebook email not provided");
}

  return {
    facebookId: userData.id,
    email: userData.email,
    firstName: userData.first_name,
    lastName: userData.last_name,
    avatar: userData.picture?.data?.url || null,
  };

};



export const handleFacebookLogin = async (facebookUser) => {

  const {
    facebookId,
    email,
    firstName,
    lastName,
    avatar
  } = facebookUser;



  

  let result = await pool.query(
  `
  SELECT
    id,
    first_name,
    last_name,
    email,
    phone,
    avatar,
    role,
    registration_completed
  FROM users
  WHERE email = $1
  `,
  [email]
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