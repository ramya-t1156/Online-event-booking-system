import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import './Register.css'; 

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        username: "",
        roleName: "" 
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            roleName: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ ...formData, roleNames: [formData.roleName] }); 
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            alert("Register failed.");
            console.log(err);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-heading">Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <label>Name:</label>
                <input className="form-input" name="name" placeholder="Name" onChange={handleChange} required />

                <label>Email:</label>
                <input className="form-input" name="email" placeholder="Email" onChange={handleChange} required />

                <label>Username:</label>
                <input className="form-input" name="username" placeholder="Username" onChange={handleChange} required />

                <label>Password:</label>
                <input className="form-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <label>Role:</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="USER"
                            checked={formData.roleName === "USER"}
                            onChange={handleRoleChange}
                        />
                        User
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ORGANIZER"
                            checked={formData.roleName === "ORGANIZER"}
                            onChange={handleRoleChange}
                        />
                        Organizer
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ADMIN"
                            checked={formData.roleName === "ADMIN"}
                            onChange={handleRoleChange}
                        />
                        Admin
                    </label>
                </div>

                <button className="submit-btn" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
