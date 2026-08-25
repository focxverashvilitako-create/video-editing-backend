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



# COURSES

## Create Course

POST /courses

### Request Body

{
  "title": "COURSE_TITLE",
  "description": "COURSE_DESCRIPTION",
  "price": 0
}

## Get All Courses

GET /courses

## Get Course by ID

GET /courses/:id

## Update Course

PUT /courses/:id

### Request Body

{
  "title": "COURSE_TITLE",
  "description": "COURSE_DESCRIPTION",
  "price": 0
}

## Delete Course

DELETE /courses/:id


# LESSONS

## Create Lesson

POST /lessons

### Request Body

{
  "section_id": "SECTION_UUID",
  "title": "LESSON_TITLE",
  "description": "LESSON_DESCRIPTION",
  "video_url": "VIDEO_URL",
  "duration": 0,
  "provider": "VIDEO_PROVIDER",
  "is_preview": false,
  "sort_order": 0
}

## Get All Lessons

GET /lessons

## Get Lesson by ID

GET /lessons/:id

## Update Lesson

PUT /lessons/:id

### Request Body

{
  "section_id": "SECTION_UUID",
  "title": "LESSON_TITLE",
  "description": "LESSON_DESCRIPTION",
  "video_url": "VIDEO_URL",
  "duration": 0,
  "provider": "VIDEO_PROVIDER",
  "is_preview": false,
  "sort_order": 0
}

## Delete Lesson

DELETE /lessons/:id


# PURCHASES

## Create Purchase

POST /purchases

### Request Body

{
  "user_id": "USER_UUID",
  "course_id": "COURSE_UUID",
  "payment_id": "PAYMENT_UUID"
}

### Response

{
  "message": "Purchase created successfully",
  "purchase": {
    "id": "PURCHASE_UUID",
    "user_id": "USER_UUID",
    "course_id": "COURSE_UUID",
    "payment_id": "PAYMENT_UUID",
    "purchase_date": "PURCHASE_DATE",
    "expires_at": "EXPIRATION_DATE",
    "status": "active"
  }
}

### Course Access

Course access is valid for 365 days from the purchase date.


## Get User Purchases

GET /purchases/user/:userId


## Get Purchase by ID

GET /purchases/:id


## Check Course Access

GET /purchases/user/:userId/course/:courseId/access

### Response

{
  "hasAccess": true
}


# COURSE PROGRESS

## Update Lesson Progress

POST /progress

### Request Body

{
  "userId": "USER_UUID",
  "lessonId": "LESSON_UUID",
  "lastPosition": 0
}

### Response

{
  "message": "Lesson progress updated successfully",
  "progress": {
    "id": "PROGRESS_UUID",
    "user_id": "USER_UUID",
    "lesson_id": "LESSON_UUID",
    "last_position": 0,
    "watched_percent": "0",
    "completed": false
  }
}

### Progress Rules

- last_position stores the last watched position in seconds.
- watched_percent stores the percentage watched.
- A lesson becomes completed when watched_percent reaches 90%.
- completed becomes true when the lesson is completed.
- Completing a lesson unlocks the next lesson.
- last_position allows the video to resume from the exact position where the user stopped.


## Get Lesson Progress

GET /progress/user/:userId/lesson/:lessonId


## Check Lesson Access

GET /progress/user/:userId/lesson/:lessonId/access

### Response

{
  "lessonId": "LESSON_UUID",
  "hasAccess": true
}


# LIVE GROUPS

## Create Live Group

POST /livegroups

### Request Body

{
  "course_id": "COURSE_UUID",
  "title": "GROUP_TITLE",
  "max_students": 0,
  "start_date": "START_DATE",
  "schedule": {},
  "location": "LOCATION",
  "status": "upcoming",
  "start_time": "START_TIME",
  "end_time": "END_TIME"
}

### Status Values

- upcoming
- active
- completed

### Notes

current_students is initialized to 0.


## Get All Live Groups

GET /livegroups


## Get Live Group by ID

GET /livegroups/:id


## Update Live Group

PUT /livegroups/:id

### Request Body

{
  "course_id": "COURSE_UUID",
  "title": "GROUP_TITLE",
  "max_students": 0,
  "start_date": "START_DATE",
  "schedule": {},
  "location": "LOCATION",
  "status": "upcoming",
  "start_time": "START_TIME",
  "end_time": "END_TIME"
}


## Delete Live Group

DELETE /livegroups/:id


# LIVE GROUP ENROLLMENT

## Enroll User in Live Group

POST /enrollments/enroll

### Request Body

{
  "userId": "USER_UUID",
  "groupId": "GROUP_UUID"
}

### Successful Response

{
  "message": "User enrolled successfully",
  "enrollment": {
    "id": "ENROLLMENT_UUID",
    "group_id": "GROUP_UUID",
    "user_id": "USER_UUID",
    "joined_at": "JOINED_DATE"
  }
}

### Enrollment Rules

The backend checks:

1. The live group exists.
2. The group status is upcoming or active.
3. The group has available seats.
4. The user is not already enrolled.
5. The enrollment is created.
6. current_students is increased by 1.


 Possible Errors

Group not found:

{
  "message": "Live group not found"
}

Already enrolled:

{
  "message": "User is already enrolled in this group"
}

Group is full:

{
  "message": "Live group is full"
}

Enrollment unavailable:

{
  "message": "Enrollment is not available for this group"
}

