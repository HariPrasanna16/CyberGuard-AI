
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";
import { Search, Shield, Activity } from "lucide-react";
import "./Dashboard.css";

export interface Alert {
  terminal_id: string;
  latitude: number;
  longitude: number;
  terminal_type: string;
  risk_score: number;
  time_window_start: string;
  time_window_end: string;
  expected_cashout_amount: number;
  explanation?: {
    baseline_spatial_pct: number;
    recent_activity_pct: number;
    network_link_pct: number;
    details: string[];
  };
}

export interface PredictionResult {
  complaint_details: any;
  mule_chain: any[];
  predicted_hotspots: Alert[];
}

export interface Hotspot extends Alert {}

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

function Dashboard() {
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [searchAck, setSearchAck] = useState("");
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================================
     FETCH ALERTS + HEATMAP
  ========================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heatmapRes, alertsRes] = await Promise.all([
          axios.get(
            `${API_URL}/api/v1/analytics/risk-heatmap`
          ),
          axios.get(
            `${API_URL}/api/v1/alerts/active`
          ),
        ]);

        setHeatmapData(heatmapRes.data);
        setActiveAlerts(alertsRes.data);
      } catch (err) {
        console.error(
          "Error fetching polling data:",
          err
        );
      }
    };

    fetchData();

    const intervalId = setInterval(
      fetchData,
      10000
    );

    return () => clearInterval(intervalId);
  }, []);


  /* =========================================
     COMPLAINT SEARCH
  ========================================= */

  const handleSearch = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!searchAck.trim()) return;

    setIsLoading(true);
    setError(null);
    setPredictionResult(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/predict/complaint`,
        {
          ack_no: searchAck.trim(),
        }
      );

      setPredictionResult(res.data);

    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        "Failed to fetch prediction"
      );

    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="dashboard">

      {/* =====================================
          GOVERNMENT HEADER
      ===================================== */}

      <header className="dashboard-header">

        <div className="header-left">

          <div className="header-emblem">
            <Shield size={25} />
          </div>

          <div className="header-title">

            <h1>
              Government of India
            </h1>

            <span>
              Ministry of Home Affairs
            </span>

          </div>

          <div className="header-divider"></div>

          <div className="system-name">

            <strong>
              I4C Command Center
            </strong>

            <span>
              Cyber Crime Intelligence & Response
            </span>

          </div>

        </div>


        {/* System Status */}

        <div className="system-status">

          <span className="status-dot"></span>

          <div>
            <strong>System Operational</strong>
            <span>Live Monitoring</span>
          </div>

        </div>

      </header>


      {/* =====================================
          MAIN DASHBOARD
      ===================================== */}

      <div className="dashboard-body">

        {/* Sidebar */}

        <aside className="dashboard-sidebar">

          <Sidebar
            activeAlerts={activeAlerts}
            predictionResult={predictionResult}
          />

        </aside>


        {/* Main Content */}

        <main className="dashboard-content">


          {/* =================================
              SEARCH BAR
          ================================= */}

          <div className="search-section">

            <div className="search-container">

              <div className="search-heading">

                <div className="search-icon">
                  <Search size={19} />
                </div>

                <div>
                  <h2>
                    Cyber Crime Case Search
                  </h2>

                  <p>
                    Trace complaint and identify
                    predicted risk locations
                  </p>
                </div>

              </div>


              <form
                onSubmit={handleSearch}
                className="search-form"
              >

                <input
                  type="text"
                  value={searchAck}
                  onChange={(e) =>
                    setSearchAck(e.target.value)
                  }
                  placeholder="Enter 14-digit NCRP ACK No."
                  aria-label="NCRP ACK Number"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "TRACING..."
                    : "TRACE CASE"}
                </button>

              </form>

            </div>


            {/* Error */}

            {error && (
              <div className="dashboard-error">
                {error}
              </div>
            )}

          </div>


          {/* =================================
              MAP AREA
          ================================= */}

          <section className="map-section">

            <div className="map-toolbar">

              <div className="map-title">

                <Activity size={17} />

                <span>
                  National Cyber Risk Monitoring Map
                </span>

              </div>

              <div className="map-live">

                <span className="live-dot"></span>

                LIVE DATA

              </div>

            </div>

            <div className="map-container">

              <MapComponent
                heatmapData={heatmapData}
                predictionResult={predictionResult}
              />

            </div>

          </section>


          {/* =================================
              FOOTER
          ================================= */}

          <footer className="dashboard-footer">

            <span>
              Government of India • Ministry of Home Affairs
            </span>

            <span>
              Secure Law Enforcement Information System
            </span>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;

