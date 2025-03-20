# MERN Stack User Authentication System

A complete user authentication system built using the MERN stack (MongoDB, Express.js, React, and Node.js). This project includes features like user registration, login, email verification, and password reset.

---

## Features

- **User Registration**: Users can create an account by providing their name, email, and password.
- **Email Verification**: A verification email is sent to the user's email address upon registration.
- **User Login**: Registered users can log in using their email and password.
- **Password Reset**: Users can reset their password by requesting a password reset link via email.
- **Protected Routes**: Authenticated users can access protected routes.
- **JWT Authentication**: JSON Web Tokens (JWT) are used for secure user authentication.
- **Responsive Design**: The frontend is built with React and is fully responsive.

---

## Technologies Used

- **Frontend**:
  - React.js
  - React Router for routing
  - Axios for API requests
  - Tailwind CSS for styling
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database
  - Mongoose for MongoDB object modeling
  - JSON Web Tokens (JWT) for authentication
  - Nodemailer for sending emails
- **Other Tools**:
  - Postman for API testing
  - Git for version control

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB (either locally or a cloud instance like MongoDB Atlas)
- A Gmail account (for sending emails via Nodemailer)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mern-auth.git
   cd mern-auth