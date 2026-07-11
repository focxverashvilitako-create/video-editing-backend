import * as authService from "./authService.js";
import { validateRegister} from "./authValidations.js";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
  try {
    validateRegister(req.body);

    const { firstname, lastname, email, password, phone, avatar } = req.body;

    const user = await authService.register(
      firstname,
      lastname,
      email,
      password,
      phone,
      avatar 
    );

    res.status(201).json({
      message: "User registered",
      user
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(
      email,
      password
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
  
};

export const forgotPassword = async (req,res)=>{

try{

const {email}=req.body;

const token = await authService.forgotPassword(email);

res.json({
message:"Password reset token created",
token
});


}catch(error){

res.status(400).json({
message:error.message
});

}

};


export const resetPassword = async(req,res)=>{

try{

const {token,newPassword}=req.body;


await authService.resetPassword(
token,
newPassword
);


res.json({
message:"Password changed successfully"
});


}catch(error){

res.status(400).json({
message:error.message
});

}

};