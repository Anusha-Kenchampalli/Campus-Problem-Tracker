# 🏫 Campus Problem Tracker (CPT) - Full-Stack Web Application

A modern, full-stack, enterprise-grade **Campus Problem Tracker & Issue Management System** designed for educational institutions, universities, and colleges. 

This platform enables **Students & Staff** to report campus infrastructure, IT, electrical, facility, and safety issues with evidence attachments, while providing **Campus Administrators** with a powerful dashboard to prioritize, delegate, track, and resolve maintenance tickets efficiently.

---

## 🔑 Quick Login & Demo Credentials

Use the pre-configured credentials below to log into the application immediately:

| Role / Portal | Login URL | ID / Username | Password | Privileges & Features |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Portal** | `http://localhost:5173/admin/login` | `ADMIN001` | `password` | Full system control, ticket management, department & staff creation, analytics, priority queue. |
| **Student / User** | `http://localhost:5173/login` | `CS24001` | `password` | Report new problems, track personal ticket status, attach evidence, receive notifications, leave ratings. |
| **Custom Student** | `http://localhost:5173/login` | Any ID (e.g. `CS24002`) | `password` | Automatically creates a new student account upon first login for testing. |

> ℹ️ **Note for Maintenance Staff**: Staff members are added and assigned to specific departments by Administrators inside the **Admin Management Portal** (`/admin/staff`).

---

## ✨ Key Features & Functionality

### 🎓 1. Student & Staff Portal (`/dashboard`, `/report-problem`, etc.)
- **Instant Issue Reporting**: Report classroom, Wi-Fi, lab equipment, plumbing, electrical, or hostel problems with title, category, location, urgency level, and image evidence upload.
- **Interactive Dashboard**: View real-time ticket counters (Total Reported, In Progress, Resolved, Pending Feedback) and live activity feeds.
- **My Problems Tracking**: Filterable list of submitted issues with status tabs (*All*, *Submitted*, *In Progress*, *Resolved*) and search bar.
- **Detailed Ticket View & Timeline**: Progress stepper tracking the issue from submission $\rightarrow$ review $\rightarrow$ staff assignment $\rightarrow$ completion.
- **In-App Notifications**: Real-time alerts when ticket statuses update or maintenance staff members are assigned.
- **Resolution Feedback & Rating System**: Rate resolved maintenance work (1 to 5 stars) with written feedback comments.
- **User Profile**: View user profile details, college ID, department, and submission history statistics.

### 🛡️ 2. Admin Management Portal (`/admin/dashboard`, `/admin/problems`, etc.)
- **Executive Overview Dashboard**: High-level KPIs, resolution efficiency %, critical alert counters, and dynamic charts (Monthly Trends, Category Distribution, Department Workload).
- **Master Problem Management**: Search, filter, inspect, assign staff, update ticket statuses (*Submitted*, *Under Review*, *In Progress*, *Resolved*, *Rejected*), and modify urgency levels.
- **Smart Priority Queue**: Algorithmically sorted priority queue highlighting *Critical* and *High* urgency issues with SLA countdown timers.
- **Department Management**: Add, edit, or remove campus departments (e.g., *IT Support*, *Facilities & Maintenance*, *Electrical*, *Plumbing*, *Hostel Management*, *Security*).
- **Staff Management**: Add and manage campus maintenance technicians, assign them to departments, and track active workloads.
- **Category & SLA Management**: Configure problem categories (e.g., *Wi-Fi & Internet*, *Water & Sanitation*, *Classroom Furniture*), custom icons, and SLA targets.
- **Campus Locations Directory**: Manage buildings, blocks, floors, and specific room numbers across campus.
- **Analytics & SLA Reports**: Visual analytics displaying resolution rates, department throughput, average resolution time, and satisfaction metrics.
- **Student Satisfaction Feedback**: Review CSAT scores, rating breakdowns, and student comments on resolved issues.
- **System Settings**: Configurable SLA thresholds, dark/light theme toggle, and auto-assignment preferences.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 19 + Vite 6
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 (Glassmorphism design system & dark/light themes)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualization**: Recharts (Interactive bar, pie, and line charts)
- **HTTP Client**: Axios

### **Backend**
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5
- **Database**: MongoDB (via Mongoose 9)
- **Authentication**: JWT & Role-Based Access Control (RBAC)
- **Data Seeding**: Automatic database seeder on server startup (`server/seed/seedData.js`)
- **Environment Management**: `dotenv`

---

## 📁 Project Directory Structure

```text
Admin Dashboard (CPT)/
├── client/                      # React Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI Components (Navbar, Sidebar, Modals, Badges)
│   │   ├── context/             # AuthContext & ThemeContext providers
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # Admin login page
│   │   │   ├── admin/           # Admin pages (Dashboard, AllProblems, PriorityQueue, Staff, etc.)
│   │   │   └── user/            # Student pages (Dashboard, ReportProblem, MyProblems, Profile, etc.)
│   │   ├── services/            # Axios API client & endpoint functions (`api.js`)
│   │   ├── App.jsx              # Application router & layout structure
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind & custom CSS styles
│   └── package.json
├── server/                      # Express Backend Server
│   ├── config/                  # Database configuration (`db.js`)
│   ├── controllers/             # Request handlers (auth, problem, staff, department, analytics)
│   ├── models/                  # Mongoose Schemas (User, Problem, Staff, Department, etc.)
│   ├── routes/                  # Express route definitions
│   ├── seed/                    # Seed script (`seedData.js`) for initializing database records
│   ├── .env                     # Backend environment variables
│   └── server.js                # Express server entry point
├── .env.example                 # Frontend environment variables template
├── package.json                 # Project dependencies & root npm scripts
└── README.md                    # Project documentation
```

---

## 🚀 Step-by-Step Installation & Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MongoDB**: A running local MongoDB instance (`mongodb://127.0.0.1:27017`) OR a **MongoDB Atlas Connection URI**.

---

### 2. Clone / Open Project
Navigate into the root directory of the project in your terminal:
```bash
cd "Admin Dashboard (CPT)"
```

---

### 3. Install Dependencies
Run the following command in the project root directory to install all required dependencies:
```bash
npm install
```

---

### 4. Configure Environment Variables

#### **Backend (`server/.env`)**
Check or edit the `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.qsshlty.mongodb.net/campus_problem_tracker?appName=Cluster0
```
*(If running MongoDB locally, use `MONGODB_URI=mongodb://127.0.0.1:27017/campus_problem_tracker`)*

#### **Frontend (`.env` in Root)**
Ensure `.env` in the root folder contains:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 5. Running the Application

You can start the backend server and frontend client in two separate terminal windows.

#### **Terminal 1: Start Backend Server**
```bash
npm run server
```
- The Express server starts on **`http://localhost:5000`**.
- On startup, it connects to MongoDB and automatically seeds default categories, departments, staff, and initial problem tickets into the database.

#### **Terminal 2: Start Frontend Application**
```bash
npm run dev
```
- The React application starts on **`http://localhost:5173`**.
- Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate student or admin user | Public |
| `GET` | `/api/auth/me` | Fetch currently logged in user profile | Authenticated |
| `GET` | `/api/problems` | Fetch all campus problems (with filters) | Admin |
| `POST` | `/api/problems` | Submit a new problem ticket | Student / Staff |
| `PUT` | `/api/problems/:id` | Update problem status, priority, or assigned staff | Admin |
| `DELETE` | `/api/problems/:id` | Delete a problem record | Admin |
| `GET` | `/api/user/problems` | Fetch tickets submitted by logged-in student | Student |
| `GET` | `/api/departments` | List all campus departments | All Users |
| `POST` | `/api/departments` | Add a new department | Admin |
| `GET` | `/api/staff` | List all maintenance staff members | Admin |
| `POST` | `/api/staff` | Add new maintenance staff | Admin |
| `GET` | `/api/categories` | Fetch problem categories | All Users |
| `GET` | `/api/analytics` | Fetch analytics, resolution stats & charts data | Admin |
| `GET` | `/api/feedback` | Fetch student satisfaction ratings & feedback | Admin |
| `POST` | `/api/feedback` | Submit rating & review for resolved ticket | Student |
| `GET` | `/api/notifications` | Fetch user/admin notifications | Authenticated |

---

## 💡 Troubleshooting & FAQs

### Q1: "Port 5000 is currently in use" error when starting the server?
**Solution**: Another Node instance is running. Stop the existing process or terminate it using:
- **Windows**: `netstat -ano | findstr :5000` then `taskkill /PID <PID_NUMBER> /F`
- **Mac/Linux**: `lsof -i :5000` then `kill -9 <PID>`

### Q2: MongoDB connection fails or times out?
**Solution**:
1. Check your internet connection if using MongoDB Atlas.
2. Ensure your IP address is whitelisted in MongoDB Atlas Network Access.
3. If running locally, ensure the MongoDB Windows Service / daemon is running (`mongod`).

### Q3: How do I test Student vs Admin features simultaneously?
**Solution**: Open an **Incognito Window** or another browser. Log into the Student Portal (`http://localhost:5173/login`) in one window and the Admin Portal (`http://localhost:5173/admin/login`) in the other window.

---

## 👨‍💻 Developer Handover & Contribution Notes

If you are continuing development on this codebase, here are helpful pointers:
1. **State Management**: Authentication state is stored in `client/src/context/AuthContext.jsx` and persisted in `localStorage`.
2. **API Communication**: All frontend HTTP calls are centralized in `client/src/services/api.js`.
3. **Database Seed Data**: Modify default seed records in `server/seed/seedData.js` to change demo users or initial categories.
4. **Theme Customization**: Dark/Light mode tokens are managed in `client/src/context/ThemeContext.jsx` and `client/src/index.css`.

---

## 📄 License
This project is open-source and intended for academic, campus management, and educational purposes.
