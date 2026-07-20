# MERN Authentication System

A full-stack authentication project built with the MERN stack. This project includes user registration, login, logout, protected authentication using JWT/cookies, and email verification using OTP sent through Nodemailer.

## Features

- User registration
- User login
- User logout
- JWT-based authentication
- Cookie-based session handling
- Protected routes using authentication middleware
- Send email verification OTP
- Verify user account using OTP
- OTP expiry handling
- MongoDB user storage
- Password hashing for security
- Environment variable configuration using dotenv

## Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Tailwind CSS / CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- cors
- dotenv
- Nodemailer

## Project Structure

```bash
Mern-Auth/
│
├── client/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   │   ├── mongodb.js
│   │   └── nodemailer.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middleware/
│   │   └── userAuth.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   └── auth.route.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Authentication Flow

### 1. Register

A new user creates an account using their name, email, and password.

The backend:
- Checks if the user already exists
- Hashes the password
- Saves the user in MongoDB
- Generates a JWT token
- Sends the token in a cookie

### 2. Login

The user logs in using email and password.

The backend:
- Checks if the user exists
- Compares the entered password with the hashed password
- Generates a JWT token
- Stores the token in an HTTP-only cookie

### 3. Protected Routes

Protected routes use the `userAuth` middleware.

The middleware:
- Reads the token from cookies
- Verifies the token using JWT
- Adds `userId` to the request object
- Allows the controller to access the logged-in user

### 4. Send Verification OTP

The logged-in user can request an email verification OTP.

The backend:
- Finds the logged-in user using `req.userId`
- Generates a 6-digit OTP
- Saves the OTP and expiry time in MongoDB
- Sends the OTP to the user email using Nodemailer

### 5. Verify Email

The user submits the OTP.

The backend:
- Checks if the OTP is valid
- Checks if the OTP has expired
- Marks the account as verified
- Clears the OTP fields

### 6. Logout

The backend clears the authentication cookie and logs the user out.

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_google_app_password

NODE_ENV=development
```

> Note: For Gmail, use a Google App Password instead of your normal Gmail password.

## Important Backend Setup Note

If you are using ES modules, load environment variables at the top of `server.js` like this:

```js
import "dotenv/config";
```

Example:

```js
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/auth.route.js";
```

This ensures that environment variables are available before other files like `nodemailer.js` are imported.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-auth.git
cd mern-auth
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` folder and add the required values.

### 5. Run Backend Server

```bash
cd server
npm run server
```

Or:

```bash
npm run dev
```

depending on your script name.

### 6. Run Frontend

```bash
cd client
npm run dev
```

## API Routes

### Auth Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/send-verify-otp` | Send account verification OTP |
| POST | `/api/auth/verify-account` | Verify account using OTP |

## Example Auth Route File

```js
import express from "express";
import {
  login,
  logout,
  register,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/auth.controller.js";

import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

export default authRouter;
```

## Nodemailer Setup

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
```

## Common Issues

### Missing credentials for "PLAIN"

This error means `EMAIL_USER` or `EMAIL_PASS` is missing or undefined.

Fix:
- Check your `.env` file
- Make sure variable names are correct
- Restart the backend server
- Use `import "dotenv/config";` at the top of `server.js`

### Gmail authentication failed

This usually happens when you use your normal Gmail password.

Fix:
- Enable 2-Step Verification in your Google account
- Generate a Google App Password
- Use that App Password as `EMAIL_PASS`

## Future Improvements

- Forgot password using OTP
- Reset password flow
- User profile page
- Email welcome message after registration
- Better frontend validation
- Loading states and toast notifications
- Account verification badge
- Refresh token support

## Author

Prince Raj

## License

This project is for learning and practice purposes.
