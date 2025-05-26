# 🚀 Chas Challenge — Backend Setup & Usage Guide

This guide helps you set up the local database for our project.

---

### 📁 Project Structure (just so you know)

Inside the `/backend` folder, there is a `db` folder that contains:

- `schema.sql` → This creates the database tables and adds test data.
- `reset.js` → This script runs the SQL file for you.

---

### 🧰 What You Need

- **MAMP - Or other local MySQL server** (Make sure MySQL is running)
- **Node.js** (Ask if you’re not sure you have this)

---

### ✅ Steps to Set Up the Database

#### 1. Create the database

- Open MAMP
- Start the servers
- Go to [http://localhost/phpMyAdmin]
- Click “New” on the left
- Name the database: `chas_challenge`
- Click **Create**

#### 2. Set your config

- In the `/backend` folder, there’s a file called `.env.example`
- Make a copy of it and rename it to `.env`
- Open `.env` and check that it looks like this:

        DB_USER=your_mysql_user
        DB_PASS=your_mysql_password
        DB_PORT=your_mysql_port
        DB_HOST=localhost
        DB_NAME=chas_challenge
        JWT_SECRET=your_jwt_secret_here

> 🛡️ `JWT_SECRET` is used to sign login tokens. You can use any long random string.


- In the `/frontend` folder, create a file called `.env.local`
- Open `.env.local` and add `NEXT_PUBLIC_API_URL=http://localhost:3001`

#### 3. Install the backend dependencies

- Open a terminal and go to the /backend folder

- Run this command:

        npm install

This installs everything needed for the database reset script and the backend to work.

#### 4. Fill the database

- Open a terminal and go to the /backend folder

- Run this command:

         npm run db:reset

This will create all the tables and add some test users and questions.

---

### 🔐 Test Logins (for local testing)

You can log in using the following test users after running `npm run db:reset`:

#### 👤 Admin User

- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** `admin`

#### 👤 Regular User

- **Email:** `user@example.com`
- **Password:** `user123`
- **Role:** `user`

These accounts are created automatically when the database is reset. Use them to test login, permissions, and role-based views.
