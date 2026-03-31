# MERN Stack Notes Manager (Database & CRUD Practice)

A full-stack web application designed to practice **Database Persistence** and **RESTful API** development. This project focuses on the core "CRUD" (Create, Read, Update, Delete) operations using a modern MERN architecture.

## 🎯 Project Goal
The primary objective of this project was to move beyond temporary "in-memory" storage and implement a persistent data layer using **MongoDB**.

## 🚀 Features
* **Full CRUD Functionality:** Create, view, edit, and delete notes in real-time.
* **Persistent Storage:** All notes are stored in a MongoDB Atlas cluster.
* **Interactive UI:** Responsive React dashboard with instant feedback for user actions.
* **Search & Filter:** Quickly find specific notes by title or content.

## 🛠️ Technical Stack
* **Frontend:** React.js (Hooks), Axios for API requests.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Mongoose ODM).
* 
---

## 🧠 Key Technical Learnings
Building this "Notes App" helped me master several backend and database concepts:

1. **Schema Design:** Using **Mongoose** to define a structured data model for notes (Title, Content, Date created).
2. **REST API Design:** Building custom endpoints (`GET`, `POST`, `PUT`, `DELETE`) to handle specific data operations.
3. **Optimistic UI Updates:** Managing React state so the UI updates immediately when a note is added or deleted.
4. **CORS & Middleware:** Configuring Express middleware to allow secure communication between the frontend (Port 3000) and backend (Port 5000).

---

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Ahmad-Yar-Khan/mern-notes-app.git](https://github.com/Ahmad-Yar-Khan/mern-notes-app.git)
