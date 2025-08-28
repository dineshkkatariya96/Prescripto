# Doctor Appointment Management System

A full-stack web application for managing doctor appointments, featuring separate panels for users/patients, doctors, and administrators. The system streamlines appointment booking, doctor management, and payment processing with a modern, responsive interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Structure](#api-structure)
- [Screenshots](#screenshots)
- [License](#license)

---

## Project Overview

This project is designed to automate and simplify the process of booking medical appointments. It provides:

- **User/Patient Panel:** Browse doctors, book appointments, make payments, and manage bookings.
- **Doctor Panel:** View appointments, update profile, manage schedule.
- **Admin Panel:** Manage doctors, view all appointments, dashboard analytics.

The backend is built with Node.js, Express, and MongoDB, while the frontend uses React, React Router, and Tailwind CSS for a seamless user experience.

---

## Features

- User registration and authentication
- Doctor registration and profile management
- Admin dashboard for managing doctors and appointments
- Secure JWT-based authentication for all roles
- Appointment booking and management
- Payment integration (PayPal)
- Responsive UI for all devices
- Toast notifications for user feedback

---

## Directory Structure

```
d:\Project\Doctor-Appointment
│
├── server/                # Backend (Node.js, Express, MongoDB)
│   ├── config/            # Configuration files (DB, Cloudinary)
│   ├── controllers/       # Route controllers (Admin, Doctor, User, PayPal)
│   ├── middlewares/       # Auth and file upload middlewares
│   ├── models/            # Mongoose models (User, Doctor, Appointment)
│   ├── routes/            # API route definitions
│   ├── .env               # Backend environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Entry point
│
├── client/                # Frontend for Users/Patients (React)
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context for global state
│   │   ├── pages/         # Page components (Home, Login, Doctors, etc.)
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── .env               # Frontend environment variables
│   ├── package.json       # Frontend dependencies
│   └── index.html         # HTML template
│
├── admin/                 # Frontend for Admins/Doctors (React)
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # Admin/Doctor UI components
│   │   ├── context/       # React Context for global state
│   │   ├── pages/         # Page components (Dashboard, AddDoctor, etc.)
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── .env               # Admin environment variables
│   ├── package.json       # Admin dependencies
│   └── index.html         # HTML template
│
└── README.md              # Project documentation
```

---

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer & Cloudinary for file uploads
- PayPal SDK for payments

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- React Toastify
- Axios (for API calls)
- Vite (build tool)

---

## Installation & Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- PayPal developer account (for payments)
- Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/doctor-appointment.git
cd doctor-appointment
```

### 2. Setup Backend (`server`)

```bash
cd server
npm install
```

- Create a `.env` file in `server/` with the following variables:

  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  PAYPAL_CLIENT_ID=your_paypal_client_id
  PAYPAL_CLIENT_SECRET=your_paypal_client_secret
  ```

- Start the backend server:

  ```bash
  npm start
  # or
  node server.js
  ```

### 3. Setup Frontend (`client`)

```bash
cd ../client
npm install
```

- Create a `.env` file in `client/` with:

  ```
  VITE_API_URL=http://localhost:5000
  ```

- Start the client app:

  ```bash
  npm run dev
  ```

### 4. Setup Admin Panel (`admin`)

```bash
cd ../admin
npm install
```

- Create a `.env` file in `admin/` with:

  ```
  VITE_API_URL=http://localhost:5000
  ```

- Start the admin app:

  ```bash
  npm run dev
  ```

---

## Environment Variables

- **Backend (`server/.env`):** Database, JWT, Cloudinary, PayPal credentials.
- **Frontend (`client/.env`, `admin/.env`):** API base URL.

---

## Usage

- **User Panel:** Access via `http://localhost:5173` (default Vite port)
- **Admin/Doctor Panel:** Access via `http://localhost:5174` (or configured port)
- **Backend API:** Runs on `http://localhost:5000` (or configured port)

---

## API Structure

**User APIs:**
- `POST /api/users/register` – Register user
- `POST /api/users/login` – Login user
- `GET /api/doctors` – List doctors
- `POST /api/appointments` – Book appointment
- `GET /api/appointments/my` – User's appointments

**Doctor APIs:**
- `POST /api/doctors/login` – Login doctor
- `GET /api/appointments/doctor` – Doctor's appointments
- `PUT /api/doctors/profile` – Update profile

**Admin APIs:**
- `POST /api/admin/login` – Login admin
- `GET /api/doctors` – List all doctors
- `POST /api/doctors` – Add doctor
- `DELETE /api/doctors/:id` – Remove doctor
- `GET /api/appointments` – All appointments

**Payment APIs:**
- `POST /api/paypal/create-payment` – Initiate payment
- `POST /api/paypal/execute-payment` – Complete payment

---

## Screenshots

_Add screenshots of the user panel, admin dashboard, and doctor dashboard here for visual reference._

---

## License

This project is licensed under the MIT License.

---

## Contact

For any queries or support, please contact [your-email@example.com].
