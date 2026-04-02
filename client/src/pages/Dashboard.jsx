import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-topbar">
          <div>
            <p className="tiny-label">MATCHA WORKSPACE</p>
            <h1>Dashboard</h1>
          </div>
          <button className="secondary-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="welcome-card">
          <div>
            <h2>Hello, {user?.username || "User"} 🍵</h2>
            <p>
              You are logged in successfully. Your authentication UI is working.
            </p>
          </div>
        </div>

        <div className="grid-cards">
          <div className="info-card">
            <h3>Authentication</h3>
            <p>Register and login flow connected with JWT.</p>
          </div>

          <div className="info-card">
            <h3>Token Storage</h3>
            <p>Your token is stored in localStorage for protected requests.</p>
          </div>

          <div className="info-card">
            <h3>Next Phase</h3>
            <p>Connect notes CRUD here after Dhan finishes the notes routes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;