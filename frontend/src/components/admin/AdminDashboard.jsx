import React, { useState, useEffect } from "react";
import axios from "axios";
import UserManagement from "./UserManagement";
import EventManagement from "./EventManagement";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`https://online-event-booking-system.onrender.com/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(res.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `https://online-event-booking-system.onrender.com/${userId}`,
        userDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Profile updated successfully!");
      setEditMode(false);
      fetchUserDetails();
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="bg-white border-bottom shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="text-primary fw-bold m-0">Event Booker</h2>
          <ul className="nav">
            <li className="nav-item">
              <button
                className={`btn btn-sm me-2 ${activeTab === "users" ? "btn-primary text-white" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("users")}
              >
                Manage Users
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm me-2 ${activeTab === "events" ? "btn-primary text-white" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("events")}
              >
                Manage Events
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm me-2 ${activeTab === "profile" ? "btn-primary text-white" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>

      <main className="container py-4 flex-grow-1">
        {activeTab === "users" && (
          <>
            <h2 className="text-primary mb-4">User Management</h2>
            <UserManagement />
          </>
        )}

        {activeTab === "events" && (
          <>
            <h2 className="text-primary mb-4">Event Management</h2>
            <EventManagement />
          </>
        )}

        {activeTab === "profile" && (
          <div className="card shadow p-4">
            <h2 className="text-primary mb-3">Your Profile</h2>
            {!editMode ? (
              <>
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Username:</strong> {userDetails.username}</p>
                <button className="btn btn-outline-primary mt-3" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userDetails.name || ""}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={userDetails.email || ""}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userDetails.username || ""}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  />
                </div>
                <button className="btn btn-primary me-2" onClick={updateProfile}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </main>

      <footer className="bg-blue text-center py-3 border-top text-primary">
        <small>&copy; {new Date().getFullYear()} Event Booker. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default AdminDashboard;

