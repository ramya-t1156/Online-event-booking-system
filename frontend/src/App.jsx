import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import OrganizerDashboard from './components/OrganizerDashboard';
import UserDashboard from './components/UserDashboard';
import HomePage from './components/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
