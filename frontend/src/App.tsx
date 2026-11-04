
import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";
import {
  Shield,
  Map as MapIcon,
  BarChart3,
  LogOut,
} from "lucide-react";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [currentPage, setCurrentPage] = useState<
    "dashboard" | "statistics"
  >("dashboard");

  // Login page
  if (!isAuthenticated) {
    return (
      <Login
        onLogin={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <div className="app">

      {/* Top Navigation */}
      <nav className="app-navbar">

        {/* Logo / Branding */}
        <div className="app-brand">

          <div className="app-brand-icon">
            <Shield size={22} />
          </div>

          <div className="app-brand-text">
            <strong>
              I4C Command Center
            </strong>

            <span>
              Cyber Crime Intelligence & Response
            </span>
          </div>

        </div>


        {/* Navigation Buttons */}
        <div className="app-navigation">

          {/* Dashboard */}
          <button
            onClick={() =>
              setCurrentPage("dashboard")
            }
            className={`app-nav-button ${
              currentPage === "dashboard"
                ? "active"
                : ""
            }`}
          >
            <MapIcon size={17} />

            <span>
              Live Map
            </span>
          </button>


          {/* Statistics */}
          <button
            onClick={() =>
              setCurrentPage("statistics")
            }
            className={`app-nav-button ${
              currentPage === "statistics"
                ? "active analytics"
                : ""
            }`}
          >
            <BarChart3 size={17} />

            <span>
              Analytics
            </span>
          </button>


          {/* Divider */}
          <div className="nav-divider"></div>


          {/* Logout */}
          <button
            onClick={() =>
              setIsAuthenticated(false)
            }
            className="logout-button"
            title="Secure Logout"
          >
            <LogOut size={17} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </nav>


      {/* Main Content */}
      <main className="app-content">

        {currentPage === "dashboard" ? (
          <Dashboard />
        ) : (
          <Statistics />
        )}

      </main>


      {/* Security Footer */}
      <footer className="security-bar">

        <div className="security-left">

          <span className="security-dot"></span>

          <span>
            Secure Government System
          </span>

        </div>

        <span>
          Authorized Personnel Only
        </span>

      </footer>

    </div>
  );
}

export default App;