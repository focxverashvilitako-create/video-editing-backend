import pool from "../../config/db.js";
import {
 getFacebookUser,
 handleFacebookLogin
} from "./facebookServices.js";


export const facebookLogin = (req, res) => {
    try {

        const facebookAuthUrl = `https://www.facebook.com/v23.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)}&scope=email,public_profile&response_type=code`;

        res.redirect(facebookAuthUrl);

    } catch (error) {
        console.error("Error during Facebook login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const facebookCallback = async(req,res)=>{

try{


const {code}=req.query;



const facebookUser = await getFacebookUser(code);



const result = await handleFacebookLogin(
facebookUser
);



res.json(result);



}catch(error){

console.log(error);


res.status(400).json({
message:error.message
});

}
}

export const completeFacebookRegister = async(req,res)=>{

try{
    
    const{
        pendingId,
        phone
    }=req.body;

    const pendingResult = await pool.query(
      `
      SELECT *
      FROM pending_social_users
      WHERE id = $1
      AND expires_at > NOW()
      `,
      [pendingId]
    );


    if (pendingResult.rows.length === 0) {
      return res.status(400).json({
        message: "Registration session invalid or expired."
      });
    }


    if (!phone) {
      return res.status(400).json({
        message: "Phone number required"
      });
    }


    const facebookUser = pendingResult.rows[0];


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
      ($1,$2,$3,$4,$5,true)
      RETURNING *
      `,
      [
        facebookUser.first_name,
        facebookUser.last_name,
        facebookUser.email,
        phone,
        facebookUser.avatar
      ]
    );


    const user = userResult.rows[0];


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
        facebookUser.provider,
        facebookUser.provider_user_id
      ]
    );


    await pool.query(
      `
      DELETE FROM pending_social_users
      WHERE id = $1
      `,
      [pendingId]
    );


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

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: error.message
    });

  }

}