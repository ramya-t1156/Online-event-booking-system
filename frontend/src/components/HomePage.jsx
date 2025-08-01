import { Link } from "react-router-dom";
import "./HomePage.css";
import "../App.css";
import { Button } from "react-bootstrap";

function HomePage() {
  return (
    <div className="home-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary-dark shadow sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">Event Booker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav fs-5">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero-section d-flex align-items-center justify-content-center">
        <div className="overlay"></div>
        <div className="content text-center">
          <h1 className="display-3 fw-bold mb-3">Welcome to EventBooker</h1>
          <p className="lead mb-4">Your ultimate solution for booking and organizing events online with ease.</p>
          <Link to="/login" className="btn btn-danger btn-lg shadow">Get Started</Link>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-primary-dark">Why Choose Event Booker?</h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="card h-100 p-4 shadow feature-card border-danger">
                <i className="bi bi-calendar2-event fs-1 text-danger mb-3"></i>
                <h5 className="text-primary-dark">Easy Booking</h5>
                <p>Book any event in just a few clicks with our intuitive interface.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card h-100 p-4 shadow feature-card border-danger">
                <i className="bi bi-people fs-1 text-danger mb-3"></i>
                <h5 className="text-primary-dark">Multiple Roles</h5>
                <p>Access tailored dashboards for Admins, Organizers, and Users.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card h-100 p-4 shadow feature-card border-danger">
                <i className="bi bi-shield-lock fs-1 text-danger mb-3"></i>
                <h5 className="text-primary-dark">Secure Platform</h5>
                <p>Protected by JWT-based login and role-based access control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary-dark text-white py-4 mt-5 border-top border-danger">
        <div className="container text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} EventBooker. All rights reserved.</p>
          <small className="text-muted">Created by Ramya T</small>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
