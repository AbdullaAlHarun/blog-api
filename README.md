# Blog API

## Overview
This project is a simple blog API built with Node.js, Express, and MySQL. It allows users to register, log in, create posts, edit posts, and delete them. A simple frontend is provided using HTML, CSS (Tailwind), and JavaScript.

## Features
- **User registration and authentication (JWT-based)**
- **CRUD operations on blog posts (Create, Read, Update, Delete)**
- **Secure API with token-based authentication**
- **Responsive frontend with Tailwind CSS**
- **MySQL database integration**

---

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL (hosted via freesqldatabase.com)**
- **Tailwind CSS**
- **JWT (JSON Web Token) authentication**

---

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Steps to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following:**
   ```ini
   DB_HOST=your-db-host
   DB_USER=your-db-username
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   PORT=5000
   JWT_SECRET=your-secret-key
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

5. **Open `index.html` in your browser to access the frontend.**

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. User Registration
**POST /api/users**
- **Description:** Registers a new user
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "id": 1
  }
  ```

#### 2. User Login
**POST /api/login**
- **Description:** Logs in a user
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token"
  }
  ```

#### 3. Create a New Post
**POST /api/posts** (Protected)
- **Headers:** `Authorization: Bearer your_jwt_token`
- **Request Body:**
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Post created successfully",
    "id": 1
  }
  ```

#### 4. Get All Posts
**GET /api/posts**
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "My First Blog Post",
      "content": "This is the content...",
      "author": "John Doe"
    }
  ]
  ```

#### 5. Update a Post
**PUT /api/posts/:id** (Protected)
- **Headers:** `Authorization: Bearer your_jwt_token`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Post updated successfully"
  }
  ```

#### 6. Delete a Post
**DELETE /api/posts/:id** (Protected)
- **Headers:** `Authorization: Bearer your_jwt_token`
- **Response:**
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

---

## Deployment

1. **Deploy the backend using Vercel/Render**
2. **Deploy the frontend using Netlify/Vercel**
3. **Update the `.env` variables with production credentials.**

---

## Future Improvements
- Add profile management for users.
- Implement likes and comments functionality.
- Improve UI with animations.

---


