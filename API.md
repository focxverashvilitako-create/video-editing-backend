# API Documentation

**Base URL:** http://localhost:3000

---

# AUTH API

## Register API

**Method:**  
POST

**Route:**  
`/auth/register`

### Body

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "avatar": "string | null"
}
```

## Verify Email API

**Method:**  
POST

**Route:**  
`/auth/verify-email`

### Body

```json
{
  "email": "string",
  "code": "string"
}
```

### Response

```json
{
  "message": "Email verified successfully",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_UUID",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "avatar": "string | null",
    "role": "student",
    "email_verified_at": "TIMESTAMP"
  }
}
```

## Resend Verification Code API

**Method:**  
POST

**Route:**  
`/auth/resend-verification`

### Body

```json
{
  "email": "string"
}
```

## Login API

**Method:**  
POST

**Route:**  
`/auth/login`

### Body

```json
{
  "email": "string",
  "password": "string"
}
```

## Forgot Password API

**Method:**  
POST

**Route:**  
`/auth/forgot-password`

### Body

```json
{
  "email": "string"
}
```

## Reset Password API

**Method:**  
POST

**Route:**  
`/auth/reset-password`

### Body

```json
{
  "token": "string",
  "newPassword": "string"
}
```

## Google OAuth

| Method | Route |
|---|---|
| GET | `/auth/google` |
| GET | `/auth/google/callback` |
| POST | `/auth/google/complete` |

## Facebook OAuth

| Method | Route |
|---|---|
| GET | `/auth/facebook` |
| GET | `/auth/facebook/callback` |
| POST | `/auth/facebook/complete` |

---

# USERS API

## Get Profile

**Method:** GET

**Route:** `/users/profile`

## Get User Dashboard

**Method:** GET

**Route:** `/users/dashboard`

---

# ADMIN API

## Get Admin Dashboard

**Method:** GET

**Route:** `/admin/dashboard`

---

# COURSES API

## Create Course

**Method:** POST

**Route:** `/courses`

### Request Body

```json
{
  "title": "COURSE_TITLE",
  "description": "COURSE_DESCRIPTION",
  "price": 0
}
```

## Get All Courses

**Method:** GET

**Route:** `/courses`

## Get Course by ID

**Method:** GET

**Route:** `/courses/:id`

## Update Course

**Method:** PUT

**Route:** `/courses/:id`

### Request Body

```json
{
  "title": "COURSE_TITLE",
  "description": "COURSE_DESCRIPTION",
  "price": 0
}
```

## Delete Course

**Method:** DELETE

**Route:** `/courses/:id`

---

# COURSE SECTIONS API

## Get All Course Sections

**Method:** GET

**Route:** `/coursesections`

## Get Sections by Course

**Method:** GET

**Route:** `/coursesections/course/:course_id`

## Get Section by ID

**Method:** GET

**Route:** `/coursesections/:id`

## Create Course Section

**Method:** POST

**Route:** `/coursesections`

## Update Course Section

**Method:** PATCH

**Route:** `/coursesections/:id`

## Delete Course Section

**Method:** DELETE

**Route:** `/coursesections/:id`

---

# LESSONS API

## Create Lesson

**Method:** POST

**Route:** `/lessons`

### Request Body

```json
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
```

## Get All Lessons

**Method:** GET

**Route:** `/lessons`

## Get Lesson by ID

**Method:** GET

**Route:** `/lessons/:id`

## Update Lesson

**Method:** PUT

**Route:** `/lessons/:id`

### Request Body

```json
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
```

## Delete Lesson

**Method:** DELETE

**Route:** `/lessons/:id`

---

# LESSON RESOURCES API

## Get All Lesson Resources

**Method:** GET

**Route:** `/lessonresources`

## Get Resource by ID

**Method:** GET

**Route:** `/lessonresources/:id`

## Get Resources by Lesson

**Method:** GET

**Route:** `/lessonresources/lesson/:lessonId`

## Create Lesson Resource

**Method:** POST

**Route:** `/lessonresources`

## Update Lesson Resource

**Method:** PUT

**Route:** `/lessonresources/:id`

## Delete Lesson Resource

**Method:** DELETE

**Route:** `/lessonresources/:id`

---

# PURCHASES API

## Create Purchase

**Method:** POST

**Route:** `/purchases`

### Request Body

```json
{
  "courseId": "COURSE_UUID",
  "paymentId": "PAYMENT_UUID"
}
```

### Response

```json
{
  "message": "Purchase created successfully",
  "purchase": {}
}
```

## Get User Purchases

**Method:** GET

**Route:** `/purchases/user/:userId`

## Get Purchase by ID

**Method:** GET

**Route:** `/purchases/:id`

## Check Course Access

**Method:** GET

**Route:** `/purchases/user/:userId/course/:courseId/access`

### Response

```json
{
  "courseId": "COURSE_UUID",
  "hasAccess": true
}
```

---

# PAYMENTS API

## Simulate Payment

**Method:** POST

**Route:** `/payments/simulate`

---

# COURSE PROGRESS API

## Get Lesson Progress

**Method:** GET

**Route:** `/progress/lesson/:lessonId`

## Update Lesson Progress

**Method:** PUT

**Route:** `/progress/lesson/:lessonId`

### Request Body

```json
{
  "lastPosition": 0,
  "watchedPercent": 0
}
```

## Check Lesson Access

**Method:** GET

**Route:** `/progress/lesson/:lessonId/access`

### Response

```json
{
  "lessonId": "LESSON_UUID",
  "hasAccess": true
}
```

---

# LIVE GROUPS API

## Create Live Group

**Method:** POST

**Route:** `/livegroups`

### Request Body

```json
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
```

## Get All Live Groups

**Method:** GET

**Route:** `/livegroups`

## Get Live Group by ID

**Method:** GET

**Route:** `/livegroups/:id`

## Update Live Group

**Method:** PUT

**Route:** `/livegroups/:id`

## Delete Live Group

**Method:** DELETE

**Route:** `/livegroups/:id`

---

# LIVE GROUP ENROLLMENT API

## Enroll User in Live Group

**Method:** POST

**Route:** `/enrollments/enroll`

### Request Body

```json
{
  "groupId": "GROUP_UUID"
}
```

### Successful Response

```json
{
  "message": "User enrolled successfully",
  "enrollment": {}
}
```

---

# LIVE GROUP MEMBERS API

## Add Live Group Member

**Method:** POST

**Route:** `/livegroupmembers`

## Get All Live Group Members

**Method:** GET

**Route:** `/livegroupmembers`

## Get Members by Group

**Method:** GET

**Route:** `/livegroupmembers/group/:groupId`

## Get Member by ID

**Method:** GET

**Route:** `/livegroupmembers/:id`

## Remove Live Group Member

**Method:** DELETE

**Route:** `/livegroupmembers/:id`

---

# LECTURE RECORDINGS API

## Create Lecture Recording

**Method:** POST

**Route:** `/lecturerecordings`

## Get All Lecture Recordings

**Method:** GET

**Route:** `/lecturerecordings`

## Get Recordings by Group

**Method:** GET

**Route:** `/lecturerecordings/group/:groupId`

## Get Recording by ID

**Method:** GET

**Route:** `/lecturerecordings/:id`

## Update Lecture Recording

**Method:** PUT

**Route:** `/lecturerecordings/:id`

## Delete Lecture Recording

**Method:** DELETE

**Route:** `/lecturerecordings/:id`

---

# SYLLABUS API

## Get All Syllabus Items

**Method:** GET

**Route:** `/syllabus`

## Get Syllabus by Course

**Method:** GET

**Route:** `/syllabus/course/:courseId`

## Get Syllabus by ID

**Method:** GET

**Route:** `/syllabus/:id`

## Create Syllabus Item

**Method:** POST

**Route:** `/syllabus`

## Update Syllabus Item

**Method:** PUT

**Route:** `/syllabus/:id`

## Delete Syllabus Item

**Method:** DELETE

**Route:** `/syllabus/:id`

---

# GALLERY API

## Get All Gallery Items

**Method:** GET

**Route:** `/gallery`

## Get Gallery Item by ID

**Method:** GET

**Route:** `/gallery/:id`

## Create Gallery Item

**Method:** POST

**Route:** `/gallery`

## Update Gallery Item

**Method:** PUT

**Route:** `/gallery/:id`

## Delete Gallery Item

**Method:** DELETE

**Route:** `/gallery/:id`

---

# SETTINGS API

## Get Settings

**Method:** GET

**Route:** `/settings`

## Create Setting

**Method:** POST

**Route:** `/settings`

## Update Setting

**Method:** PUT

**Route:** `/settings/:id`

## Delete Setting

**Method:** DELETE

**Route:** `/settings/:id`

---

# CONTACT MESSAGES API

## Send Contact Message

**Method:** POST

**Route:** `/contactmessages`

## Get All Contact Messages

**Method:** GET

**Route:** `/contactmessages`

## Get Contact Message by ID

**Method:** GET

**Route:** `/contactmessages/:id`

## Update Contact Message Status

**Method:** PATCH

**Route:** `/contactmessages/:id/status`

## Delete Contact Message

**Method:** DELETE

**Route:** `/contactmessages/:id`
