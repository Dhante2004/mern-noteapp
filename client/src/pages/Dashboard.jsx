import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-shell">
          <div className="welcome-card">
            <h2>Loading your dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <div>
            <p className="tiny-label">MATCHA NOTEAPP</p>
            <h1>Dashboard</h1>
          </div>
          <button className="secondary-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="welcome-card">
          <h2>Hello, {user?.username || "User"} 🍵</h2>
          <p>
            You are successfully logged in. Your frontend is now connected to
            Dhan&apos;s backend authentication.
          </p>
        </section>

        <section className="grid-cards">
          <div className="info-card">
            <h3>Account Info</h3>
            <p><strong>Username:</strong> {user?.username || "-"}</p>
            <p><strong>Email:</strong> {user?.email || "-"}</p>
          </div>

          <div className="info-card">
            <h3>Authentication</h3>
            <p>
              JWT token is stored locally and verified through the protected
              <code> /auth/me </code> route.
            </p>
          </div>

          <div className="info-card">
            <h3>Next Step</h3>
            <p>
              This dashboard is ready for the Notes CRUD UI once the notes routes
              are added.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;