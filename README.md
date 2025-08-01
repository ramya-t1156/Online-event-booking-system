# Online Event Booking System

A full-stack web application for managing and booking events, built using **React** for the frontend and **Spring Boot** for the backend.

**Live Demo:**  
 [online-event-booking-system.vercel.app](https://online-event-booking-system.vercel.app)

---

## Features

-  Secure login & registration with JWT authentication
-  Role-based access for **Admin**, **Organizer**, and **User**
-  Organizers can create, edit, and manage events
-  Users can browse and book events
-  Admins can monitor users and event activities

---

### 🛠 Tech Stack

* **Frontend:** React, React Router, Axios
* **Backend:** Spring Boot, Spring Security, JWT
* **Database:** MySQL
* **Deployment:** Render (Backend), Vercel/Netlify (Frontend)

---

##  Project Structure

```bash
event-booking-system/
├── backend/           # Spring Boot backend
└── frontend/          # React frontend

---

### 🔐 Roles

* `ROLE_ADMIN` – Manage users and all events
* `ROLE_ORGANIZER` – Create/manage their own events
* `ROLE_USER` – Browse and book events

---

###  How to Run Locally

1. Clone the repository:

   ```
   git clone https://github.com/your-username/event-booking-app.git
   ```

2. Set up MySQL database.

3. Configure `.env` or `application.properties` with DB and JWT settings.

4. Run backend:

   ```
   cd backend
   mvn spring-boot:run
   ```

5. Run frontend:

   ```
   cd frontend
   npm install
   npm start
   ```
