<div align="center">

# MERN Authentication System

### Full-stack authentication with JWT cookies, email verification, and password recovery

A responsive MERN application that supports account creation, login, persistent authentication, email verification through OTP, and secure password reset.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

[Live Website](https://mern-auth-five-gules.vercel.app/) · [Report a Bug](https://github.com/princeritik/Mern-Auth/issues) · [Request a Feature](https://github.com/princeritik/Mern-Auth/issues)

</div>

---

## About the project

**MERN Authentication System** is a full-stack authentication application built with MongoDB, Express, React, and Node.js.

It demonstrates a complete account lifecycle:

- Register a new account
- Sign in with email and password
- Maintain authentication using an HTTP-only JWT cookie
- Verify an email address using a six-digit OTP
- Request a password-reset OTP
- Set a new password after OTP verification
- Retrieve authenticated user information
- Sign out and clear the session

The frontend uses React Context to maintain the authentication state and Axios to communicate with the API using credentialed requests.

## Features

### Authentication

- User registration and login
- Password hashing with bcrypt
- JWT authentication with a seven-day expiry
- HTTP-only cookie-based sessions
- Authentication-check endpoint
- Protected routes through JWT middleware
- Secure logout by clearing the authentication cookie

### Email verification

- Six-digit verification OTP
- OTP delivery through Brevo SMTP and Nodemailer
- Verification OTP expiry after 24 hours
- Account-verification status stored in MongoDB
- Keyboard navigation and paste support in the OTP interface

### Password recovery

- Password-reset OTP delivered by email
- Reset OTP expiry after 15 minutes
- Multi-step reset-password interface
- Secure hashing of the new password

### User experience

- Responsive React and Tailwind CSS interface
- Sign-up and login modes in one form
- Authentication state managed through React Context
- Toast notifications for success and error feedback
- Personalized home-page greeting
- User menu with verification and logout actions

## Tech stack

### Frontend

| Technology | Purpose |
| --- | --- |
| [React](https://react.dev/) | User interface |
| [Vite](https://vite.dev/) | Development and production build tooling |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | API requests |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | User notifications |
| [Tailwind CSS](https://tailwindcss.com/) | Styling and responsive design |

### Backend

| Technology | Purpose |
| --- | --- |
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | REST API |
| [MongoDB](https://www.mongodb.com/) | User-data storage |
| [Mongoose](https://mongoosejs.com/) | MongoDB object modeling |
| [JSON Web Token](https://jwt.io/) | Session authentication |
| [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Nodemailer](https://nodemailer.com/) | Email delivery |
| [Brevo SMTP](https://www.brevo.com/products/transactional-email/) | Transactional email provider |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Authentication-cookie parsing |
| [CORS](https://github.com/expressjs/cors) | Credentialed cross-origin requests |

## Application flow

```text
Register or Login
       │
       ▼
Server validates credentials
       │
       ▼
JWT is stored in an HTTP-only cookie
       │
       ▼
Client checks /api/auth/is-auth
       │
       ▼
Authenticated user data is loaded
       │
       ├── Verify email with OTP
       │
       ├── Use protected account features
       │
       └── Logout and clear the cookie
```

### Registration

1. The user submits a name, email address, and password.
2. The server checks whether the email is already registered.
3. The password is hashed with bcrypt.
4. The new user is stored in MongoDB.
5. A signed JWT is returned in an HTTP-only cookie.

### Email verification

1. An authenticated user requests a verification OTP.
2. A six-digit OTP is stored with a 24-hour expiry.
3. The OTP is sent through Brevo SMTP.
4. The submitted OTP is checked against the stored value and expiry.
5. The account is marked as verified.

### Password reset

1. The user submits their registered email address.
2. A six-digit reset OTP is generated and emailed.
3. The OTP remains valid for 15 minutes.
4. The user submits the OTP and a new password.
5. The new password is hashed before being saved.

## Routes

### Frontend routes

| Route | Description |
| --- | --- |
| `/` | Home page and user dashboard |
| `/login` | Registration and login page |
| `/email-verify` | Email-verification OTP page |
| `/reset-password` | Password-recovery flow |

### API endpoints

The default local API base URL is:

```text
http://localhost:4000
```

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/` | Public | API health response |
| `POST` | `/api/auth/register` | Public | Create an account |
| `POST` | `/api/auth/login` | Public | Log in and create a cookie session |
| `POST` | `/api/auth/logout` | Public | Clear the authentication cookie |
| `POST` | `/api/auth/send-verify-otp` | Required | Email an account-verification OTP |
| `POST` | `/api/auth/verify-account` | Required | Verify the account using an OTP |
| `GET` | `/api/auth/is-auth` | Required | Check the current authentication state |
| `POST` | `/api/auth/send-reset-otp` | Public | Email a password-reset OTP |
| `POST` | `/api/auth/reset-password` | Public | Reset a password using email and OTP |
| `GET` | `/api/user/data` | Required | Return the authenticated user's data |

Requests to protected endpoints must include the authentication cookie. Axios is configured with `withCredentials: true` in the frontend.

## Project structure

```text
Mern-Auth/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images, icons, and frontend assets
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Global auth state and API helpers
│   │   ├── pages/
│   │   │   ├── EmailVerify.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── App.jsx                 # Frontend routes
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── emailTemplate.js
│   │   ├── mongodb.js
│   │   ├── nodemailer.js
│   │   └── resetPasswordTemplate.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── userAuth.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── user.route.js
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

## Getting started

### Prerequisites

Install or create the following:

- [Node.js](https://nodejs.org/)
- npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database or local MongoDB instance
- A [Brevo](https://www.brevo.com/) account with SMTP credentials

### Clone the repository

```bash
git clone https://github.com/princeritik/Mern-Auth.git
cd Mern-Auth
```

### Install dependencies

Install the backend dependencies:

```bash
cd server
npm install
```

Install the frontend dependencies:

```bash
cd ../client
npm install
```

## Environment variables

### Server

Create `server/.env`:

```env
PORT=4000
NODE_ENV=development

MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net
JWT_SECRET=replace_with_a_long_random_secret

CLIENT_URL=http://localhost:5173

BREVO_SMTP_USER=your_brevo_smtp_username
BREVO_SMTP_KEY=your_brevo_smtp_key
SENDER_NAME=Your App Name
SENDER_EMAIL=verified-sender@example.com
```

> The database configuration appends `/mern-auth` to `MONGODB_URL`. Provide the connection URL without a database name at the end.

### Client

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

The frontend uses `VITE_BACKEND_URL` during local development. In production it sends requests to the same origin, while `client/vercel.json` rewrites `/api/*` requests to the deployed backend.

Never commit `.env` files or real credentials.

## Running locally

Open two terminals.

### Terminal 1 — backend

```bash
cd server
npm run server
```

The API runs at `http://localhost:4000`.

For a non-watching process, use:

```bash
npm start
```

### Terminal 2 — frontend

```bash
cd client
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Available scripts

### Client

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Server

| Command | Description |
| --- | --- |
| `npm run server` | Start the API with Nodemon |
| `npm start` | Start the API with Node.js |
| `npm test` | Placeholder; automated tests are not configured |

## Example API requests

### Register

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "name": "Example User",
    "email": "user@example.com",
    "password": "strong-password"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "user@example.com",
    "password": "strong-password"
  }'
```

### Check authentication

```bash
curl http://localhost:4000/api/auth/is-auth \
  -b cookies.txt
```

### Get user data

```bash
curl http://localhost:4000/api/user/data \
  -b cookies.txt
```

## Deployment

The repository includes Vercel configuration for both applications.

### Deploy the server

1. Import the repository into Vercel.
2. Set the root directory to `server`.
3. Add all server environment variables.
4. Set `NODE_ENV=production`.
5. Set `CLIENT_URL` to the deployed frontend origin.

The Express app is exported from `server.js` for serverless deployment.

### Deploy the client

1. Create another Vercel project from the same repository.
2. Set the root directory to `client`.
3. Build with `npm run build`.
4. Set the output directory to `dist`.
5. Update the API destination in `client/vercel.json` when using a different backend URL.

The included rewrite also routes frontend URLs to `index.html`, allowing React Router pages to load correctly after a refresh.

## Security notes

This project implements several important authentication practices:

- Passwords are stored as bcrypt hashes, not plain text.
- JWTs are kept in HTTP-only cookies, preventing direct JavaScript access.
- Production cookies use `secure: true` and `sameSite: "none"`.
- Cross-origin requests are restricted to configured origins.
- Verification and reset OTPs have expiration times.
- Secrets and SMTP credentials are loaded through environment variables.

For a production application, also consider rate limiting, CSRF protection, request validation, stronger password rules, OTP-attempt limits, security headers, audit logging, and automated tests.

## Roadmap

- Add request validation with a schema-validation library
- Add rate limiting for login and OTP endpoints
- Add CSRF protection
- Add resend-OTP cooldowns and attempt limits
- Add password-strength requirements
- Add refresh-token rotation
- Add account profile management
- Add automated API and frontend tests
- Add continuous integration
- Add accessible loading and disabled states

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash
git commit -m "Add your feature"
```

4. Push the branch:

```bash
git push origin feature/your-feature-name
```

5. Open a pull request.

## License

The backend package declares the ISC license, but the repository does not currently include a root license file. Add a `LICENSE` file to clearly define reuse and distribution terms.

## Author

**Prince Raj**

- GitHub: [@princeritik](https://github.com/princeritik)
- Repository: [princeritik/Mern-Auth](https://github.com/princeritik/Mern-Auth)

---

<div align="center">

Built with MongoDB, Express, React, and Node.js.

</div>
