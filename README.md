# Project Documentation: Darbuka Event Management System

## Overview

This project includes both the server-side and client-side implementation for a darbuka event management system. It allows users to register, log in, book events, and enables managers to organize event types. users and bookings. The project adheres to REST architecture and includes robust authentication and authorization features.

## Technologies Used

* **Node.js**: Runtime environment (server-side)
* **React**: Front-end framework
* **TypeScript**: Programming language
* **Express**: Web framework (server-side)
* **Mongoose**: ORM for MongoDB
* **bcrypt**: Password hashing
* **JWT**: Authentication
* **Jest**: Unit testing framework

## Getting Started

### Prerequisites

* Node.js
* MongoDB
* Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:

   * Create a `.env` file in the root directory with the following:

     ```env
     PORT=3000
     DB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>
     JWT_SECRET=<your-secret>
     ```
4. Start the server:

   ```bash
   npm run start
   ```
5. Start the client:

   ```bash
   cd client
   npm start
   ```

### Testing

Run unit tests using:

```bash
npm run test
```

## Directory Structure

```
project-root
├── client
│   ├── src
│   │   ├── asstes
│   │   ├── components
│   │   ├── models
│   │   └── services
│   ├── App.tsx
│   ├── main.ts
│   ├── index.html
│   ├── package.json
│   └── README.md
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   ├── tests
│   │   ├── business.test.ts
│   │   ├── event-types.test.ts
│   │   └── events.test.ts
│   ├── app.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── README.md
└── package.json
```

## Notable Enhancements

1. **TypeScript**: Strongly typed codebase for better maintainability.
3. **Conflict Validation**: Prevent overlapping events.
4. **Authorization Middleware**: Role-based access control for endpoints.
5. **Responsive Client Interface**: Enhances user experience on multiple devices.

---

Developed as a comprehensive project for showcasing full-stack development in the context of darbuka event management.
