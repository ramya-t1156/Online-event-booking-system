import { useEffect, useState } from "react";
import axios from "axios";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    capacity: 0,
    price: 0,
    organizerId: "",
    status: ""
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://online-event-booking-system.onrender.com/api/events", { headers });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://online-event-booking-system.onrender.com/api/events/${editingId}`, formData, { headers });
        setEditingId(null);
      } else {
        await axios.post("https://online-event-booking-system.onrender.com/api/events", formData, { headers });
      }
      setFormData({
        title: "",
        description: "",
        type: "",
        location: "",
        startDateTime: "",
        endDateTime: "",
        capacity: 0,
        price: 0,
        organizerId: "",
        status: ""
      });
      fetchEvents();
    } catch (err) {
      console.error("Failed to save event", err);
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://online-event-booking-system.onrender.com/api/events/${id}`, { headers });
      fetchEvents();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  return (
    <div className="container mb-5">
      {/* Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          {editingId ? "Update Event" : "Create New Event"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input type="text" name="title" value={formData.title} className="form-control" placeholder="Title" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="description" value={formData.description} className="form-control" placeholder="Description" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="type" value={formData.type} className="form-control" placeholder="Type" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" name="location" value={formData.location} className="form-control" placeholder="Location" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Start Date & Time</label>
              <input type="datetime-local" name="startDateTime" value={formData.startDateTime} className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date & Time</label>
              <input type="datetime-local" name="endDateTime" value={formData.endDateTime} className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input type="number" name="capacity" value={formData.capacity} className="form-control" placeholder="Capacity" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input type="number" name="price" value={formData.price} className="form-control" placeholder="Price" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input type="text" name="organizerId" value={formData.organizerId} className="form-control" placeholder="Organizer ID" onChange={handleChange} required />
            </div>
            <div className="col-md-12">
              <input type="text" name="status" value={formData.status} className="form-control" placeholder="Status" onChange={handleChange} required />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success">
                {editingId ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">Event List</div>
        <div className="card-body table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted">No events found.</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.type}</td>
                    <td>{event.location}</td>
                    <td>{event.startDateTime}</td>
                    <td>{event.endDateTime}</td>
                    <td>{event.capacity}</td>
                    <td>{event.price}</td>
                    <td>{event.status}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(event)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(event.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
