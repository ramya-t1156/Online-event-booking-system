import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchEvents();
    if (userId) {
      fetchUserBookings();
      fetchUserDetails();
    }
  }, [userId]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://online-event-booking-system.onrender.com/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const res = await axios.get(
        `https://online-event-booking-system.onrender.com/api/bookings/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleQuantityChange = (eventId, value) => {
    setQuantities({ ...quantities, [eventId]: value });
  };

  const handleBooking = async (event) => {
    let numberOfTickets = Number(quantities[event.id]);

    if (!numberOfTickets || numberOfTickets <= 0) {
      const input = prompt(
        `How many tickets do you want for "${event.title}"?`
      );
      if (!input || isNaN(input) || Number(input) <= 0) {
        alert("Invalid number of tickets.");
        return;
      }
      numberOfTickets = Number(input);
    }

    const totalPrice = numberOfTickets * event.price;

    const confirmBooking = window.confirm(
      `Book ${numberOfTickets} ticket(s) for "${event.title}"?\nTotal: ₹${totalPrice}`
    );

    if (!confirmBooking) return;

    const payload = {
      eventId: event.id,
      userId,
      numberOfTickets,
      totalPrice,
      status: "active",
    };

    try {
      await axios.post("https://online-event-booking-system.onrender.com/api/bookings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Booking successful!");
      fetchUserBookings();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed.");
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(search.toLowerCase()) ||
      event.location?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDateTime = (dateTimeStr) => {
    const options = {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    };
    return new Date(dateTimeStr).toLocaleString(undefined, options);
  };

  const updateProfile = async () => {
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
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="bg-white border-bottom shadow-sm py-3 mb-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="text-primary fw-bold">Event Booker</h3>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <button
                  className={`btn btn-sm me-2 ${activeTab === "home" ? "btn-primary text-white" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("home")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-sm me-2 ${activeTab === "search" ? "btn-primary text-white" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("search")}
                >
                  Search
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-sm me-2 ${activeTab === "bookings" ? "btn-primary text-white" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("bookings")}
                >
                  Bookings
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
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container flex-grow-1">
        {activeTab === "home" && (
          <>
            <div className="bg-primary text-white text-center p-4 rounded shadow mb-4">
              <h1>Welcome to Event Booker</h1>
              <p className="lead">Discover and book events with ease</p>
            </div>
            <div className="row g-4">
              {events.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <div className="card shadow border-primary">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{event.title}</h5>
                      <p className="text-muted mb-1">{event.type}</p>
                      <p className="mb-1">{event.location}</p>
                      <p className="mb-1">{formatDateTime(event.startDateTime)} - {formatDateTime(event.endDateTime)}</p>
                      <p className="mb-1">₹{event.price}</p>
                      <p className="mb-1">Capacity: {event.capacity}</p>
                      <p className="mb-1">Status: {event.status}</p>
                      <p className="card-text">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "search" && (
          <>
            <h2 className="text-primary mb-3">Search Events</h2>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search by title or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="row g-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <div className="card shadow border-secondary">
                    <div className="card-body">
                      <h5 className="card-title text-secondary">{event.title}</h5>
                      <p className="text-muted">{event.type}</p>
                      <p>{event.location}</p>
                      <p>{formatDateTime(event.startDateTime)} - {formatDateTime(event.endDateTime)}</p>
                      <p>₹{event.price}</p>
                      <p>Capacity: {event.capacity}</p>
                      <p>Status: {event.status}</p>
                      <input
                        type="number"
                        min="1"
                        className="form-control mt-2"
                        placeholder="Tickets"
                        value={quantities[event.id] || ""}
                        onChange={(e) => handleQuantityChange(event.id, e.target.value)}
                      />
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => handleBooking(event)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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


        {activeTab === "bookings" && (
          <>
            <h2 className="text-primary mb-3">Your Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-muted">No bookings yet.</p>
            ) : (
              <div className="row g-4">
                {bookings.map((booking) => {
                  const event = events.find((e) => e.id === booking.eventId);
                  return (
                    <div key={booking.id} className="col-md-6 col-lg-4">
                      <div className="card shadow border-success">
                        <div className="card-body">
                          <h5 className="card-title text-success">{event?.title || "Event"}</h5>
                          <p>Tickets: {booking.numberOfTickets}</p>
                          <p>Total: ₹{booking.totalPrice}</p>
                          <p>Status: {booking.status}</p>
                          <p>{event ? formatDateTime(event.startDateTime) : ""}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-blue text-center py-3 border-top mt-auto text-primary">
        <small>&copy; {new Date().getFullYear()} Event Booker. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default UserDashboard;
