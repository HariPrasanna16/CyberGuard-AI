
import React, { useState } from "react";
import { Shield, Lock, Building2 } from "lucide-react";
import "./Login.css";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="login-page">

      {/* Government Header */}
      <header className="gov-header">

        <div className="gov-header-inner">

          <div className="gov-brand">

            <div className="gov-emblem">
              <Building2 size={28} />
            </div>

            <div>
              <h1>Government of India</h1>
              <p>Ministry of Home Affairs</p>
            </div>

          </div>

          <div className="department-info">
            <strong>
              National Cyber Crime Coordination Centre
            </strong>

            <span>
              Secure Government Portal
            </span>
          </div>

        </div>

        <div className="blue-strip"></div>

      </header>


      {/* Main Content */}
      <main className="login-main">

        <div className="login-container">

          {/* Portal Branding */}
          <div className="portal-heading">

            <div className="shield-icon">
              <Shield size={34} />
            </div>

            <h2>I4C Command Center</h2>

            <p>
              Cyber Crime Intelligence & Response Portal
            </p>

          </div>


          {/* Login Card */}
          <div className="login-card">

            <div className="card-header">

              <h3>Authorized Access</h3>

              <p>
                Sign in using your authorized officer credentials.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="login-form"
            >

              {/* Officer ID */}
              <div className="form-group">

                <label htmlFor="officer-id">
                  Officer ID
                </label>

                <input
                  id="officer-id"
                  type="text"
                  required
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Enter Officer ID"
                />

              </div>


              {/* Access Key */}
              <div className="form-group">

                <label htmlFor="access-key">
                  Access Key
                </label>

                <div className="password-wrapper">

                  <Lock className="lock-icon" size={17} />

                  <input
                    id="access-key"
                    type="password"
                    required
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter access key"
                  />

                </div>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="login-button"
              >
                {isLoading
                  ? "Authenticating..."
                  : "Sign In Securely"}
              </button>

            </form>


            {/* Security Notice */}
            <div className="security-wrapper">

              <div className="security-notice">

                <Shield size={17} />

                <div>

                  <strong>
                    Authorized Personnel Only
                  </strong>

                  <p>
                    This system is restricted to authorized
                    law enforcement personnel. All access
                    attempts may be monitored and logged.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Footer Information */}
          <div className="portal-footer">

            <p>
              Government of India • Ministry of Home Affairs
            </p>

            <span>
              National Cyber Crime Reporting & Intelligence Infrastructure
            </span>

          </div>

        </div>

      </main>


      {/* Bottom Footer */}
      <footer className="bottom-footer">

        <p>
          © Government of India • Secure Government Information System
        </p>

      </footer>

    </div>
  );
};

export default Login;

