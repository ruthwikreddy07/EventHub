<p align="center">
  <h1 align="center">🎫 EventHub</h1>
  <p align="center">
    A state-of-the-art, full-stack event management and ticket booking platform built with <strong>Angular Standalone</strong> and <strong>Node.js/Express</strong>.
    <br />
    Discover events, book tickets securely with Stripe, and manage resources via a powerful, real-time Admin Dashboard.
    <br /><br />
  </p>
</p>

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Cleanups & Architectural Improvements](#cleanups--architectural-improvements)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints Reference](#api-endpoints-reference)
- [Folder Structure](#folder-structure)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 About The Project

**EventHub** is a premium, secure, and modern web application that bridges event organizers and attendees. Users can seamlessly browse upcoming local and virtual events, view rich event banners and descriptions, and book tickets with a secure, integrated **Stripe Checkout** payment gateway.

For administrative roles, EventHub features a comprehensive **Admin Dashboard** providing real-time data analytics, full event CRUD control, booking monitoring, and user role management. 

The application utilizes **Angular (Standalone components)** with an elegant **Angular Material** styling framework on the frontend, and a production-grade **Express/Node.js RESTful API** connected to **MongoDB Atlas** on the backend.

---

## ✨ Key Features

### 👤 User-Facing Experience
- **Interactive Browsing** — Dedicated Home and Events views with modern grid cards.
- **Dynamic Event Details** — Rich information including real-time seats count, pricing in local currency, location details, dates, and banner images.
- **Stripe Payments** — Seamless, secure transactional checkout sessions using the formal Stripe SDK.
- **User Profile & Booking History** — View customized profile details and a complete historical ledger of booked tickets.
- **Micro-Animations & Responsive Design** — HSL-tailored gradients, hover actions, and interactive transitions optimized across mobile, tablet, and desktop viewports.

### 🔐 Administrative Controls
- **At-a-Glance Analytics** — Total revenue tracking, total registered users, booking tallies, and active events.
- **Event Management** — Seamless creation, modification, and deletion of events including interactive forms with form validations.
- **User Management** — View user registers, upgrade standard accounts to Administrator, and delete obsolete accounts.
- **Booking Ledger** — Review all bookings made across the entire platform.

### 🛡️ Security & Integrity
- **JWT Authentication** — Session handling using JSON Web Tokens with client-side decoding and automatic logout on token expiration.
- **Password Hashing** — Multi-round salting and hashing utilizing `bcryptjs`.
- **HTTP Security Headers** — Hardened Express server protected by `helmet` headers against XSS and clickjacking.
- **Route Guards** — Standalone Angular `CanActivate` guards preventing unauthorized dashboard or booking path access.
- **Route Authorization** — Express backend server route middleware (`auth` and `admin`) acting as a double-sided fence protecting database entities.

---

## 🏗️ Cleanups & Architectural Improvements

During our comprehensive audit, several critical fixes and optimizations were implemented to align the codebase with professional software standards:

1. **Security Hardening**:
   - Committed credentials from `.env` were successfully purged from git tracking. A template [backend/.env.example](file:///d:/WPM/EventHub/backend/.env.example) was created.
   - Hardcoded Stripe publishable keys in `payment.ts` were refactored to read dynamically from Angular's environment config.
2. **Obsolete File Purge**:
   - Legacy Express generator scaffolding artifacts (`app.js`, `bin/www`, empty `public/` directory, unused `views/` directory, stale route controllers) were completely removed.
   - Accidental terminal log dumps (`tash`, `et --hard e6f31b7`) at the project root were deleted.
3. **Monorepo Environment Setup**:
   - The root [package.json](file:///d:/WPM/EventHub/package.json) was rewritten as a monorepo coordinator with convenient scripts (`npm start`, `npm run start:frontend`, `npm run build:frontend`).
   - A robust root [.gitignore](file:///d:/WPM/EventHub/.gitignore) was created.
4. **Environment Isolation**:
   - Created a standalone [environment.development.ts](file:///d:/WPM/EventHub/eventhub-ui/src/environments/environment.development.ts) for local development.
   - Configured file replacements in `angular.json` so serving locally hits `localhost:5000` while building for production replacements targets Render.
   - Configured robust, directory-agnostic `.env` path loading in `backend/server.js` using absolute directory paths (`path.join(__dirname, '.env')`).
5. **UI Fixes**:
   - Fixed header navigation by adding "Events" routes for both logged-in and logged-out users.
   - Replaced deprecated `via.placeholder.com` image URLs with reliable placeholders.
   - Solved double-saving tokens to localStorage inside `login.ts` (now gracefully delegated entirely to `AuthService`).

---

## 🛠️ Tech Stack

### Frontend Architecture
* **Framework**: Angular Standalone (v20)
* **UI & Styling**: Angular Material, CSS Grid/Flexbox, Custom SCSS
* **Utility Libraries**: `jwt-decode` (JWT token extraction)
* **Payments SDK**: `@stripe/stripe-js` (Secure checkout integration)

### Backend Architecture
* **Runtime & Framework**: Node.js, Express.js
* **Database & ORM**: MongoDB, Mongoose ODM
* **Security & Auth**: `bcryptjs`, `jsonwebtoken` (JWT), `helmet`
* **Integrations**: `stripe` (Stripe Payment Node API)
* **Utilities**: `dotenv` (Configuration), `nodemailer` (Notifications), `qrcode` (Ticket generation)

---

## 📊 Project Architecture

```
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│                     │  HTTP  │                     │  TCP   │                     │
│   Angular Frontend  │◄──────►│   Express Backend   │◄──────►│   MongoDB Atlas     │
│   (Port 4200)       │  REST  │   (Port 5000)       │        │   (Cloud DB)        │
│                     │  API   │                     │        │                     │
└─────────────────────┘        └──────────┬──────────┘        └─────────────────────┘
                                          │
                                          │ HTTPS (Stripe Sessions)
                                          ▼
                               ┌─────────────────────┐
                               │   Stripe Payment    │
                               │   Gateway           │
                               └─────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Verify you have the following installed:
- **Node.js** (v18 or higher) — [Download here](https://nodejs.org/)
- **npm** (usually packaged with Node.js)
- **MongoDB Atlas** account (or a local MongoDB daemon)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ruthwikreddy07/EventHub.git
   cd EventHub
   ```

2. **Install all dependencies:**
   You can easily install both backend and frontend dependencies from the root directory:
   ```bash
   # Install root backend dependencies
   npm install

   # Install frontend dependencies
   cd eventhub-ui
   npm install
   cd ..
   ```

### Environment Variables

Configure your local credentials:
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Copy the template example file to create a real `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `backend/.env` in your editor and fill in your credentials:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.frrybb1.mongodb.net/eventhub?retryWrites=true&w=majority

   # App Port
   PORT=5000

   # JWT secret key
   JWT_SECRET=your_jwt_secret_key_here

   # Stripe credentials (sk_test_...)
   STRIPE_SECRET_KEY=sk_test_51SKD...

   # Local frontend URL for Stripe redirects
   FRONTEND_URL=http://localhost:4200
   ```

### Running the Application

For a fully automated local development process:

1. **Start the Backend API Server** (from the root directory):
   ```bash
   npm start
   ```
   The API server will launch at `http://localhost:5000`. You will see `MongoDB connected` upon successful connection.

2. **Start the Angular Frontend** (in a separate terminal window at the root directory):
   ```bash
   npm run start:frontend
   ```
   This compiles the Angular app in development mode using file replacements to correctly connect to the local server. The application will be serving at `http://localhost:4200`.

---

## 📡 API Endpoints Reference

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Sign up a new user account | Public |
| `POST` | `/api/auth/login` | Log in and receive a secure JWT token | Public |

### Events CRUD
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/events` | Retrieve all active events | Public |
| `GET` | `/api/events/:id` | Fetch specific event details by ID | Public |
| `POST` | `/api/events` | Create a new event card | Admin |
| `PUT` | `/api/events/:id` | Update an existing event details | Admin |
| `DELETE` | `/api/events/:id` | Terminate an event from records | Admin |

### Tickets & Bookings
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/bookings` | Create a new ticket booking | Private (User) |
| `GET` | `/api/bookings/my-bookings` | Fetch logged-in user's historical bookings | Private (User) |
| `GET` | `/api/bookings` | Fetch all system bookings | Admin |

### Payment Gateway
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/payments/create-checkout-session` | Initialize a Stripe Checkout session | Private (User) |

### Administrative Control
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/users` | Retrieve all registered users | Admin |
| `PUT` | `/api/users/:id/role` | Escalate/de-escalate user role (`user`/`admin`) | Admin |
| `DELETE` | `/api/users/:id` | Purge a user account | Admin |
| `GET` | `/api/analytics/summary` | Fetch dashboard analytics metrics | Admin |

---

## 📁 Folder Structure

After cleaning up the Express legacy generator files, the directory is extremely neat:

```
EventHub/
├── backend/                              # Express Node Server
│   ├── middleware/
│   │   ├── auth.js                       # JWT Validation middleware
│   │   └── admin.js                      # Admin Authorization middleware
│   ├── models/
│   │   ├── user.model.js                 # User database schema
│   │   ├── event.model.js                # Event database schema
│   │   └── booking.model.js              # Booking database schema
│   ├── routes/
│   │   ├── auth.routes.js                # /api/auth/* endpoints
│   │   ├── event.routes.js               # /api/events/* endpoints
│   │   ├── booking.routes.js             # /api/bookings/* endpoints
│   │   ├── payment.routes.js             # /api/payments/* endpoints
│   │   ├── user.routes.js                # /api/users/* endpoints (Admin)
│   │   └── analytics.routes.js           # /api/analytics/* endpoints (Admin)
│   ├── .env.example                      # Template for backend variables
│   ├── server.js                         # Production entry point
│   └── .gitignore                        # Local gitignore ignoring .env
│
├── eventhub-ui/                          # Angular 20 Standalone App
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/                    # Admin Pages (CRUD)
│   │   │   ├── admin-dashboard/          # Analytics dashboards
│   │   │   ├── booking/                  # Ticket processing page
│   │   │   ├── event-details/            # Dynamic details view
│   │   │   ├── event-list/               # Browse events gallery
│   │   │   ├── home/                     # Landing page with trending events
│   │   │   ├── layout/header/            # Navigation bar component
│   │   │   ├── services/                 # Angular services communicating with API
│   │   │   ├── app.routes.ts             # Client routing configuration
│   │   │   ├── app.config.ts             # Application providers & interceptors
│   │   │   └── app.ts                    # Main SPA container component
│   │   ├── environments/
│   │   │   ├── environment.ts            # Production Environment API
│   │   │   └── environment.development.ts# Development Local API
│   │   ├── styles.scss                   # Global SASS stylesheets
│   │   └── index.html                    # Single Page index HTML
│   ├── angular.json                      # Angular workspace settings & fileReplacements
│   └── package.json                      # Frontend dependencies
│
├── .gitignore                            # Centralized Root Gitignore
├── build.sh                              # Production Shell compilation script
└── package.json                          # Root coordination package.json
```

---

## 🌐 Build & Deployment

### Production Compilation
To compile the Angular frontend for deployment:
```bash
npm run build:frontend
```
This builds the Standalone frontend into high-performance static files inside `eventhub-ui/dist/eventhub-ui/` optimized for static hosting providers like Netlify, Vercel, or Firebase Hosting.

### Backend Hosting (Render)
The backend is set up for hosting on **Render** (or any Node.js PAAS):
1. Create a Web Service pointing to your repository.
2. Set the root directory to `.` (or keep default).
3. Set the Build Command: `npm install`
4. Set the Start Command: `node backend/server.js` (or `npm start`)
5. Define your environment variables in the Render console (matching `backend/.env.example`).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. **Fork** the repository.
2. **Create** your branch (`git checkout -b feature/amazing-feature`).
3. **Commit** your changes (`git commit -m 'Add amazing feature'`).
4. **Push** to the branch (`git push origin feature/amazing-feature`).
5. **Open** a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - open source and free for educational and personal use.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ruthwikreddy07">ruthwikreddy07</a>
</p>
