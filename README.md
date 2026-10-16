# Video Editing Academy — Backend

ვიდეო მონტაჟის ონლაინ სასწავლო პლატფორმის Backend სისტემა. მოიცავს მომხმარებლის ავტორიზაციას, კურსების მართვას, ვიდეო გაკვეთილებს, გადახდებს, სასწავლო პროგრესსა და ლაივ ჯგუფებს.

## 1. გამოყენებული ტექნოლოგიები

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Database:** PostgreSQL
- **Database Connection:** `pg`
- **Authentication:** JWT
- **Social Authentication:** Google OAuth, Facebook OAuth

## 2. მონაცემთა ბაზა

გამოიყენება PostgreSQL რელაციური მონაცემთა ბაზა, რომელიც ინახავს მომხმარებლების, კურსების, გაკვეთილების, გადახდების, შესყიდვების, სასწავლო პროგრესის, ლაივ ჯგუფებისა და სხვა მოდულების მონაცემებს.

## 3. ძირითადი მოდულები

- Authentication & Users
- Courses & Course Sections
- Lessons & Lesson Resources
- Purchases & Payments
- Course Progress
- Live Groups & Enrollment
- Lecture Recordings
- Syllabus
- Gallery
- Contact Messages
- Website Settings
- Admin Dashboard

## 4. ავტორიზაცია და უსაფრთხოება

სისტემაში გამოყენებულია:

- JWT-ზე დაფუძნებული ავტორიზაცია;
- როლებზე დაფუძნებული წვდომის კონტროლი (`student`, `admin`);
- ელფოსტის დადასტურება;
- პაროლის აღდგენა;
- Google და Facebook OAuth;
- დაცული API როუტები;
- მოთხოვნების ვალიდაცია.

## 5. ინსტალაცია და კონფიგურაცია

პროექტის dependencies უნდა დაინსტალირდეს შემდეგი ბრძანებით:

```bash
npm install
```

პროექტის მთავარ საქაღალდეში უნდა შეიქმნას `.env` ფაილი და განისაზღვროს საჭირო გარემოს ცვლადები:

```env
PORT=3000
DATABASE_URL=your_database_url
```

ასევე უნდა განისაზღვროს ავტორიზაციის, ელფოსტისა და OAuth-ის კონფიგურაციისთვის საჭირო ცვლადები.

## 6. სერვერის გაშვება

Development რეჟიმში სერვერი უნდა გაეშვას შემდეგი ბრძანებით:

```bash
npm run dev
```

**API Base URL:** `http://localhost:3000`

## 7. API დოკუმენტაცია

API როუტების ჩამონათვალი და შესაბამისი HTTP მეთოდები მოცემულია [`API.md`](./API.md) ფაილში.