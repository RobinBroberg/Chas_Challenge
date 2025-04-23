# 📘 Chas Challenge — Database Setup Guide

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
- Go to [http://localhost/phpMyAdmin](http://localhost/phpMyAdmin)
- Click “New” on the left
- Name the database: `chas_challenge`
- Click **Create**

#### 2. Set your config

- In the `/backend` folder, there’s a file called `.env.example`
- Make a copy of it and rename it to `.env`
- Open `.env` and check that it looks like this:

```env
DB_USER=root
DB_PASS=root
DB_PORT=8889   # Use 3306 if you're on Windows
DB_HOST=localhost
DB_NAME=chas_challenge
```

#### 3. Fill the database

    Open a terminal and go to the /backend folder

    Run this command:

    npm run db:reset

This will create all the tables and add some test users and questions.
