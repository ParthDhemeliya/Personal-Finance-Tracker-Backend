# Personal Finance Tracker Backend

A robust backend API for managing personal finances, including budgets, expenses, income, savings, and more. Built with Node.js and TypeScript.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Modules Overview](#modules-overview)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication and authorization (JWT-based)
- Budget management (creation, overview, and management)
- Expense and income tracking with categories
- Savings goals and current savings tracking
- Transaction history
- Modular and scalable codebase
- Centralized error handling

---

## Project Structure

```
Personal-Finance-Tracker-Backend/
│
├── config/                # Database and app configuration
├── models/                # Mongoose models (User, Budget, Transaction, etc.)
├── public/                # Static files (API health page)
├── src/
│   ├── middlewares/       # Error and request middlewares
│   ├── modules/           # Feature modules (auth, budget, expense, income, savings, etc.)
│   ├── routes/            # Root and API routes
│   └── utils/             # Utility functions and error helpers
├── types/                 # TypeScript type definitions
├── server.ts              # Entry point
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Personal-Finance-Tracker-Backend.git
   cd Personal-Finance-Tracker-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the required variables (see [Environment Variables](#environment-variables)).

4. **Run the server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The API will be available at `http://localhost:PORT/api`.

---

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_jwt_secret
```

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Budgets

- `GET /api/budget` — Get all budgets
- `POST /api/budget` — Create a new budget
- `GET /api/budget/:id` — Get budget by ID
- `PUT /api/budget/:id` — Update budget
- `DELETE /api/budget/:id` — Delete budget

### Expenses

- `GET /api/expense` — List expenses
- `POST /api/expense` — Add an expense
- `GET /api/expense/:id` — Get expense by ID
- `PUT /api/expense/:id` — Update expense
- `DELETE /api/expense/:id` — Delete expense

### Income

- `GET /api/income` — List income records
- `POST /api/income` — Add income
- `GET /api/income/:id` — Get income by ID
- `PUT /api/income/:id` — Update income
- `DELETE /api/income/:id` — Delete income

### Savings

- `GET /api/savings` — List savings goals
- `POST /api/savings` — Add savings goal
- `PUT /api/savings/:id` — Update savings goal

### Transactions

- `GET /api/transaction` — List all transactions

> **Note:** For full details and request/response formats, see the controller files in `src/modules/`.

---

## Modules Overview

- **auth**: Handles user registration, login, and JWT authentication.
- **budget**: Budget creation, overview, and management.
- **expense**: Expense tracking and statistics.
- **income**: Income tracking, sources, and statistics.
- **savings**: Savings goals and current savings.
- **transaction**: Transaction history and management.
- **category**: Expense and income categories.
- **balance**: Balance calculations and summaries.

---

## Error Handling

- Centralized error handling using custom `AppError` and async handler utilities.
- Consistent error responses with status codes and messages.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

**For more details, see the source code and individual module documentation.**
