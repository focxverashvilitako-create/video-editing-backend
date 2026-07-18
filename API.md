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
   "user:{"id": "uuid",
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
Post

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
Post

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
Post

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
  "message": "Registration completed",
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