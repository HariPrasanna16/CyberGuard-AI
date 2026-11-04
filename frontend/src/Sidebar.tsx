
import React, { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Activity,
  ShieldAlert,
  Target,
} from "lucide-react";
import type { Alert, PredictionResult } from "./Dashboard";
import "./Sidebar.css";

interface SidebarProps {
  activeAlerts: Alert[];
  predictionResult: PredictionResult | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeAlerts,
  predictionResult,
}) => {
  const [filterMode, setFilterMode] = useState<
    "all" | "critical"
  >("all");

  const displayAlerts = activeAlerts
    .filter(
      (a) =>
        filterMode === "all" ||
        a.risk_score > 0.95
    )
    .sort(
      (a, b) =>
        b.risk_score - a.risk_score
    );

  return (
    <aside className="sidebar">

      {/* =================================
          SIDEBAR HEADER
      ================================= */}

      <div className="sidebar-header">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            <ShieldAlert size={23} />
          </div>

          <div>
            <h1>I4C Command Center</h1>

            <p>
              Proactive Cybercrime Intervention
            </p>
          </div>

        </div>

        <div className="sidebar-status">
          <span className="status-indicator"></span>
          LIVE MONITORING
        </div>

      </div>


      {/* =================================
          CONTENT
      ================================= */}

      <div className="sidebar-content">

        {predictionResult ? (

          /* =================================
             TRACED TARGET
          ================================= */

          <div className="prediction-panel">

            <div className="section-title">

              <div className="section-title-left">
                <Target size={17} />
                <span>Traced Target</span>
              </div>

              <span className="case-status">
                CASE FOUND
              </span>

            </div>


            {/* Complaint Information */}

            <div className="case-card">

              <div className="case-row">

                <span className="field-label">
                  COMPLAINT NO
                </span>

                <span className="field-value mono">
                  {predictionResult.complaint_details.ack_no}
                </span>

              </div>


              <div className="case-row">

                <span className="field-label">
                  CATEGORY
                </span>

                <span className="field-value category">
                  {
                    predictionResult
                      .complaint_details
                      .crime_category
                  }
                </span>

              </div>


              <div className="case-row">

                <span className="field-label">
                  DEFRAUDED AMOUNT
                </span>

                <span className="field-value amount">
                  ₹
                  {predictionResult.complaint_details.defrauded_amount.toLocaleString()}
                </span>

              </div>


              <div className="case-row">

                <span className="field-label">
                  MULE CHAIN HOPS
                </span>

                <span className="field-value">
                  {predictionResult.mule_chain.length}{" "}
                  transactions traced
                </span>

              </div>

            </div>


            {/* Hotspot Forecast */}

            <div className="subsection-title">

              <MapPin size={16} />

              <span>
                Hotspot Forecast
              </span>

            </div>


            <div className="hotspot-list">

              {predictionResult.predicted_hotspots.length ===
              0 ? (

                <div className="empty-state">
                  No predicted hotspots available.
                </div>

              ) : (

                predictionResult.predicted_hotspots.map(
                  (hotspot, idx) => (

                    <div
                      key={idx}
                      className="hotspot-card"
                    >

                      <div className="hotspot-top">

                        <div className="terminal-id">
                          #{hotspot.terminal_id}
                        </div>

                        <div className="risk-badge">
                          {(
                            hotspot.risk_score * 100
                          ).toFixed(1)}
                          %
                        </div>

                      </div>


                      <div className="hotspot-info">

                        <span>
                          Terminal Type
                        </span>

                        <strong>
                          {hotspot.terminal_type}
                        </strong>

                      </div>


                      <div className="cashout">

                        <span>
                          Expected Cash-out
                        </span>

                        <strong>
                          ₹
                          {Math.round(
                            hotspot.expected_cashout_amount
                          ).toLocaleString()}
                        </strong>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </div>

        ) : (

          /* =================================
             LIVE THREATS
          ================================= */

          <div className="threat-panel">

            <div className="section-title">

              <div className="section-title-left">

                <Activity
                  size={17}
                  className="activity-icon"
                />

                <span>
                  Live Threats
                </span>

              </div>


              <select
                className="filter-select"
                value={filterMode}
                onChange={(e) =>
                  setFilterMode(
                    e.target.value as
                      | "all"
                      | "critical"
                  )
                }
              >

                <option value="all">
                  All Active
                </option>

                <option value="critical">
                  Critical (&gt;95%)
                </option>

              </select>

            </div>


            {/* Alert List */}

            <div className="alert-list">

              {displayAlerts.length === 0 ? (

                <div className="empty-state">

                  <ShieldAlert
                    size={25}
                  />

                  <span>
                    No active threats detected.
                  </span>

                </div>

              ) : (

                displayAlerts.map(
                  (alert, idx) => (

                    <div
                      key={idx}
                      className="alert-card"
                    >

                      <div className="alert-header">

                        <div className="dispatch-label">

                          <AlertTriangle
                            size={14}
                          />

                          <span>
                            Dispatch Needed
                          </span>

                        </div>

                        <span className="alert-time">
                          {new Date(
                            alert.time_window_start
                          ).toLocaleTimeString()}
                        </span>

                      </div>


                      <div className="alert-terminal">

                        {alert.terminal_id}

                      </div>


                      <div className="alert-bottom">

                        <span>
                          Risk Assessment
                        </span>

                        <strong>
                          {(
                            alert.risk_score * 100
                          ).toFixed(0)}
                          %
                        </strong>

                      </div>


                      <div className="risk-progress">

                        <div
                          className="risk-progress-value"
                          style={{
                            width: `${Math.min(
                              alert.risk_score * 100,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </div>

        )}

      </div>


      {/* =================================
          SIDEBAR FOOTER
      ================================= */}

      <div className="sidebar-footer">

        <div>
          <span>SECURITY LEVEL</span>
          <strong>AUTHORIZED ACCESS</strong>
        </div>

        <ShieldAlert size={16} />

      </div>

    </aside>
  );
};

export default Sidebar;
