import { useEffect, useState } from "react";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://online-event-booking-system.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://online-event-booking-system.onrender.com/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://online-event-booking-system.onrender.com/api/users/${editUser.id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="container mb-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">User Management</div>
        <div className="card-body table-responsive">
          {users.length === 0 ? (
            <p className="text-muted text-center">No users available</p>
          ) : (
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) =>
                  editUser && editUser.id === user.id ? (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <input
                          name="name"
                          value={editUser.name}
                          onChange={handleChange}
                          className="form-control form-control-sm"
                        />
                      </td>
                      <td>
                        <input
                          name="username"
                          value={editUser.username}
                          onChange={handleChange}
                          className="form-control form-control-sm"
                        />
                      </td>
                      <td>
                        <input
                          name="email"
                          value={editUser.email}
                          onChange={handleChange}
                          className="form-control form-control-sm"
                        />
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setEditUser(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
