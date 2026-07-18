import {
 getFacebookUser,
 handleFacebookLogin
} from "./facebookService.js";



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

};