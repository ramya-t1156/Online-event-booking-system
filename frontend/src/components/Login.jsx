import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(userDetails);

            const { token, userId, username, roles } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("username", username);
            localStorage.setItem("roles", roles);

            alert("Login successful");

            const rolesArray = roles.split(',').map(role => role.trim());

            if (rolesArray.includes("ROLE_ADMIN")) {
                navigate('/admin-dashboard');
            } else if (rolesArray.includes("ROLE_ORGANIZER")) {
                navigate('/organizer-dashboard');
            } else if (rolesArray.includes("ROLE_USER")) {
                navigate('/user-dashboard');
            } else {
                navigate('/'); 
            }

        } catch (err) {
            alert("Login failed");
            console.log(err);
        }
    };


    return (
        <div style={styles.body}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');
                `}
            </style>
            <div style={styles.container}>
                <h1 style={styles.banner}>Welcome to <span style={styles.eventName}>Event Booker</span></h1>
                <div style={styles.card}>
                    <h2 style={styles.title}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                name="username"
                                style={styles.input}
                                placeholder="Enter username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <input
                                type="password"
                                name="password"
                                style={styles.input}
                                placeholder="Enter password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" style={styles.button}>Login</button>
                        </div>
                        <p style={styles.linkText}>
                            Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    body: {
        background: 'linear-gradient(to right, #e0f7ff, #cceeff)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#0066cc',
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        outline: 'none',
        fontSize: '1rem',
        transition: '0.3s',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#0066cc',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        transition: '0.3s',
    },
    linkText: {
        textAlign: 'center',
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#555',
    },
    link: {
        color: '#0066cc',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
        container: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
    },

    banner: {
        fontSize: '2.8rem',
        fontWeight: '600',
        color: '#003366',
        margin: '0',
    },

    eventName: {
        color: '#0099ff',
    },

};

export default Login;
