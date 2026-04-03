import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [formData, setFormData] = useState({
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
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="app-shell">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">
          Sign in to manage your notes with a clean matcha workspace.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;