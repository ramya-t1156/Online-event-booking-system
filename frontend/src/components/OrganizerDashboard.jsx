import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrganizerDashboard() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    capacity: "",
    price: "",
  });
  
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);
  const [bookingsMap, setBookingsMap] = useState({});
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const organizerId = localStorage.getItem("userId");
  const userId = organizerId;

  useEffect(() => {
    fetchMyEvents();
    fetchUserDetails();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://online-event-booking-system.onrender.com/api/events/organizer/${organizerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyEvents(response.data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://online-event-booking-system.onrender.com/api/events",
        {
          ...eventData,
          organizerId,
          status: "UPCOMING",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyEvents([...myEvents, response.data]);
      setEventData({
        title: "",
        description: "",
        type: "",
        location: "",
        startDateTime: "",
        endDateTime: "",
        capacity: "",
        price: "",
      });
      setActiveTab("your-events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const toggleBookings = async (eventId) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `https://online-event-booking-system.onrender.com/api/bookings/event/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookingsMap((prev) => ({ ...prev, [eventId]: res.data }));
      setExpandedEventId(eventId);
    } catch (err) {
      console.error("Error loading bookings:", err);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
      try {
        await axios.put(
          `https://online-event-booking-system.onrender.com/api/users/${userId}`,
          userDetails,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Profile updated successfully!");
        setEditMode(false);
        fetchUserDetails(); 
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Failed to update profile.");
      }
    };

    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`https://online-event-booking-system.onrender.com/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

  return (
    <div className="flex flex-column min-vh-100 bg-light">
      <header className="py-3 border-bottom bg-white shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="fw-bold text-primary m-0">Event Booker</h2>
          <nav>
            <button
              className={`btn btn-sm me-2 ${activeTab === "home" ? "btn-primary text-white" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`btn btn-sm me-2 ${activeTab === "add-event" ? "btn-primary text-white" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("add-event")}
            >
              Add Event
            </button>
            <button
              className={`btn btn-sm ${activeTab === "your-events" ? "btn-primary text-white" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("your-events")}
            >
              Your Events
            </button>

            <button
              className={`btn btn-sm me-2 ${activeTab === "profile" ? "btn-primary text-white" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>

            <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                localStorage.clear(); 
                navigate("/");      
              }
            }}
          >
            Logout
          </button>
          </nav>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        {activeTab === "home" && (
          <div className="container my-4 flex-grow-1">
            <div className="bg-white py-5 px-4 rounded shadow-sm text-center mb-5 border border-primary">
              <h1 className="display-5 fw-bold text-primary mb-3">Welcome, Event Organizer!</h1>
              <p className="lead text-secondary">
                Seamlessly manage every aspect of your events — all from a single powerful dashboard.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-calendar-plus display-4 text-primary"></i>
                  </div>
                  <h4 className="fw-bold text-dark">Create & Publish Events</h4>
                  <p className="text-secondary">
                    Design and launch your events in minutes with our intuitive creation tools.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-graph-up display-4 text-success"></i>
                  </div>
                  <h4 className="fw-bold text-dark">Monitor Bookings</h4>
                  <p className="text-secondary">
                    Track attendee registrations, revenue, and engagement in real-time.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-tools display-4 text-warning"></i>
                  </div>
                  <h4 className="fw-bold text-dark">Manage Event Details</h4>
                  <p className="text-secondary">
                    Edit event information, update timings, or change venues anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "add-event" && (
          <div className="card mb-4 shadow">
            <div className="card-header bg-primary text-white">Create New Event</div>
            <div className="card-body">
              <form onSubmit={handleEventSubmit}>
                <div className="mb-3">
                  <input type="text" name="title" className="form-control" placeholder="Title" value={eventData.title} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <textarea name="description" className="form-control" placeholder="Description" value={eventData.description} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <input type="text" name="type" className="form-control" placeholder="Type (e.g., Music, Tech)" value={eventData.type} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <input type="text" name="location" className="form-control" placeholder="Location" value={eventData.location} onChange={handleInputChange} required />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Start Date & Time</label>
                    <input type="datetime-local" name="startDateTime" className="form-control" value={eventData.startDateTime} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date & Time</label>
                    <input type="datetime-local" name="endDateTime" className="form-control" value={eventData.endDateTime} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input type="number" name="capacity" className="form-control" placeholder="Capacity" value={eventData.capacity} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <input type="number" name="price" className="form-control" placeholder="Price" value={eventData.price} onChange={handleInputChange} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Add Event</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "your-events" && (
          <div>
            <h3 className="mb-3 text-primary">My Events</h3>
            {myEvents.length === 0 ? (
              <p className="text-muted">No events created yet.</p>
            ) : (
              <div className="row">
                {myEvents.map((event) => (
                  <div key={event.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm border border-primary">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{event.title}</h5>
                        <p className="card-text">{event.description}</p>
                        <p><strong>Type:</strong> {event.type}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Starts:</strong> {new Date(event.startDateTime).toLocaleString()}</p>
                        <p><strong>Ends:</strong> {new Date(event.endDateTime).toLocaleString()}</p>
                        <p><strong>Capacity:</strong> {event.capacity}</p>
                        <p><strong>Price:</strong> ₹{event.price}</p>
                        <p><strong>Status:</strong> {event.status}</p>
                        <button className="btn btn-outline-primary" onClick={() => toggleBookings(event.id)}>
                          {expandedEventId === event.id ? "Hide Bookings" : "View Bookings"}
                        </button>

                        {expandedEventId === event.id && bookingsMap[event.id] && (
                          <div className="mt-3 bg-light p-3 rounded border border-secondary">
                            <h6 className="text-secondary">Bookings</h6>
                            {bookingsMap[event.id].length === 0 ? (
                              <p>No bookings yet.</p>
                            ) : (
                              <ul className="list-group">
                                {bookingsMap[event.id].map((booking) => (
                                  <li className="list-group-item" key={booking.id}>
                                    <strong>User ID:</strong> {booking.userId} — 🎟️ {booking.numberOfTickets} — ₹{booking.totalPrice} — <strong>Status:</strong> {booking.status}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
}

export default OrganizerDashboard;
