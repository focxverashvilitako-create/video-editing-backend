URL: http://localhost:3000

Register API

Method:
POST

Route:
/auth/register

Body:

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "avatar": "string | null"
}

Response:
{ 
  "token": "string",
   "user:{
    "id": "uuid",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "avatar": "string | null",
  "role": "string 
  }
}

Login API

Method:
POST

routes:
/auth/login


Body:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "token": "string",
  "user": {
    "id": "uuid",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "avatar": "string | null",
    "role": "string"
  }
}


forgot-password API

Method:
POST

route:
/auth/forgot-password


Body:
{
  "email": "string"
}


Response:
{
  "token": "string"
}


Reset-password API

Method:
POST

route:
/auth/reset-password

Body:
{
  "token": "string",
  "newPassword": "string"
}


Response:
{
  "message": "Password reset successful"
}


Profile API

Method:
GET

route:
/users/profile


Authentication:
Required

 Headers:

Authorization: Bearer JWT_TOKEN


 Response API

{
  "message": "profile works",
  "user": {
    "id": "string",
    "email": "string",
    "role": "string"
  }
}


Dashboard API

Method:
GET

route:
/users/dashboard

Authentication:
Required

Headers:

Authorization: Bearer JWT_TOKEN


 Response:

{
  "message": "dashboard works",
  "user": {
    "id": "string",
    "email": "string",
    "role": "string"
  }
}

  Google login start API

  Method: 
  Get

  route:
  /auth/google

  Response:
  Redirect to Google login page.






Google login API



Method:
GET

route:
/auth/google/callback


 Query Parameters:

code: string (required)




 Possible Responses:

## 1. Registration/Login completed

{
  "token": "JWT_TOKEN",
  "user": {}
}


## 2. Phone number required

{
  "needsPhone": true,
  "pendingId": "string"
}


Complete google registration API:

Method:
POST

route:
/auth/google/complete


Body:

{
  "pendingId": "string",
  "phone": "string"
}


Response:

{
  "message": "Registration completed",
  "token": "JWT_TOKEN",
  "user": {}
}


Facebook registration start API:

Method:
GET

route:
/auth/facebook


Response:
redirect to facebook login page


Facebook login callback API:
Method:
GET

route:
/auth/facebook/callback

Query Parameters:

code: string (required)



Description:
Facebook returns authorization code after successful login.



Possible Responses:


## 1. Existing user login successful


{
  "token": "JWT_TOKEN",
  "user": {
    "id": "uuid",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "avatar": "string | null",
    "role": "string"
  }
}




## 2. New Facebook user - phone required


{
  "needsPhone": true,
  "pendingId": "string"
}