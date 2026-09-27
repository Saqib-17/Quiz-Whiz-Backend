# QuizWhiz Backend ⚙️

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com)

---

## Overview

The **QuizWhiz Backend** is a RESTful API built with Node.js and Express.js, providing secure and efficient data management, user authentication, and quiz handling for the QuizWhiz frontend.

---

## Features

- User authentication
- CRUD operations for quizzes, questions, and user data
- MongoDB database integration via Mongoose
- Secure password hashing and validation
- REST API endpoints with proper error handling

## Question Sets

Questions are stored as named sets within a subject. Each set contains a `questions` array, and each question contains a `title` and an `options` array.

Create a set with `POST /api/questions`:

```json
{
  "subject": "physics",
  "setName": "Set 1",
  "questions": [
    {
      "title": "What is the speed of light?",
      "options": [
        { "text": "3 × 10^8 m/s", "isCorrect": true },
        { "text": "3 × 10^6 m/s", "isCorrect": false }
      ]
    }
  ]
}
```

- `GET /api/questions/:subject` returns all sets for a subject.
- `GET /api/questions/:subject/:setName` returns one named set. URL-encode names containing spaces.
- A subject cannot have two sets with the same `setName`.
- Run `npm run seed:questions` to upsert the sets in `seed/questions.json`.

Existing database records stored as individual questions are left untouched and are not included in set responses. Convert them into the new set format before relying on those records.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt for password hashing

---

## Setup & Run

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- MongoDB (local or cloud)

### Installation

Clone the repository or navigate to the backend folder if part of a monorepo:

git clone https://github.com/Saqib-17/QuizWhiz.git  
cd QuizWhiz/server

Install dependencies:

npm install

Create a `.env` file in the `server` folder with the following environment variables:

Start the development server:

npm run dev

_(Make sure you have `nodemon` installed globally or as a dev dependency for `npm run dev` to work.)_

---

## Contribution

Feel free to fork the repo, create branches, and submit pull requests!

---

## Contact

Md. Shahidul Islam Sakib — Email: shahidul.sakib17@gmail.com | GitHub: https://github.com/Saqib-17
