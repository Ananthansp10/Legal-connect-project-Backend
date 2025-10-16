# 🧠 Legal Consultation Backend

This is the backend service for the **Legal Consultation Platform**, providing APIs for user authentication, consultation booking, real-time communication, and admin management.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **TypeScript** – For type safety and maintainable code
- **Socket.IO** – Real-time communication
- **Cloudinary** – Image storage and management
- **Multer** – File upload handling
- **JWT (JSON Web Token)** – Authentication and authorization
- **Bcrypt.js** – Password hashing
- **dotenv** – Environment variable management
- **webrtc** - For video call
- **Cors** – Cross-origin requests handling  
- **Nodemailer** – Sending emails (verification, notifications, etc.)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/Ananthansp10/Legal-connect-project-Backend.git

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Create a .env File
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### 4️⃣ Build & Run the Server
npm run build

💡 Features

🧍 User Features

JWT-based Authentication – Secure signup, login, and logout.

Google OAuth Login – Quick login using Google account.

Profile Management – Users can update profile details and upload images.

Consultation Booking – Book legal consultations with lawyers easily.

Payment Integration – Secure online payments for consultations with razorpay.

Search and Filter – Find lawyers or services easily with search and filters.

Email Notifications – Get updates on account activity.

💬 Real-Time Features

Socket.IO Chat – Real-time chat between users and lawyers.
Webrtc - For real time video call with socket.io as signaling server

🧑‍💼 Admin Features

Admin Authentication – Separate secure login for admin users.

User Management – View, search, block/unblock users.

Lawyer Management – Approve or reject lawyer profiles.

Appointment Management – Monitor and manage ongoing consultations.

Dashboard Analytics – View key metrics like total users, consultations, revenue, etc.

Subscription Management - Add, edit, delete and disable subscription plans

Download Overall Report - Total revenue, total users, total lawyers, total appointments etc

⚙️ System Features

Cloudinary Integration – Upload and store images securely on the cloud.

Environment Configuration – Secure credentials using .env variables.

API Security – Protected routes using JWT and role-based authorization.

Scalable Architecture – Built for performance and easy future expansion.

🐳 Dockerization Setup

You can containerize and run this backend using Docker.
Follow these steps 👇

1️⃣ Create a Dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]

3️⃣ Build & Run the Container
Using Docker Only
docker build -t legal-backend .
docker run -p 5000:5000 --env-file .env legal-backend
