import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="app-shell">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="auth-subtitle">
          Start your matcha notes workspace with a clean and simple setup.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;