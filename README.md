# Utility Bill Management System - Server

This is the backend (server-side) component of the Utility Bill Management System. It provides the API, business logic, and database management for handling utility bills, users, payments, and analytics.

> **Note**: This repository contains only the server-side code. The frontend/client application is in a separate repository.

## 🚀 Features

*   **User Authentication & Authorization**: Secure user registration, login, and session management using JWT.
*   **CRUD Operations for Bills**: Create, Read, Update, and Delete utility bills (electricity, water, gas, etc.).
*   **Automated Calculations**: Automatically calculates charges based on usage and predefined rates.
*   **RESTful API**: Well-defined endpoints for frontend communication.
*   **Data Persistence**: Stores user and bill data in a database (e.g., MongoDB, PostgreSQL).
*   **Basic Reporting**: Provides endpoints to fetch data for analytics and reports.

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: (e.g., MongoDB with Mongoose ORM / PostgreSQL with Prisma)
*   **Authentication**: Firebase
*   **Environment Management**: dotenv

## 📦 Prerequisites

Ensure you have the following installed on your machine:
*   Node.js (v16 or higher)
*   npm
*   A running instance of your chosen database (e.g., MongoDB)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/devrabiul/utility-bill-management-system-server.git
    cd utility-bill-management-system-server
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

## 📡 API Endpoints Overview

| Method | Endpoint                | Description                | Auth Required |
| :----- | :---------------------- | :------------------------- | :-----------: |
| POST   | `/api/auth/register`    | Register a new user        | No            |
| POST   | `/api/auth/login`       | Login a user               | No            |
| GET    | `/api/bills`            | Get all bills for the user | Yes           |
| POST   | `/api/bills`            | Create a new bill          | Yes           |
| PUT    | `/api/bills/:id`        | Update a specific bill     | Yes           |
| DELETE | `/api/bills/:id`        | Delete a specific bill     | Yes           |

*For a complete and interactive API documentation, please refer to the Postman collection or OpenAPI/Swagger docs (if available).*
