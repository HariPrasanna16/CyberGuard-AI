
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  IndianRupee,
  ShieldAlert,
  Activity,
} from "lucide-react";
import "./Statistics.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

const Statistics: React.FC = () => {
  const [stats, setStats] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/analytics/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  /* =====================================
     LOADING
  ===================================== */

  if (loading) {
    return (
      <div className="statistics-state">
        <div className="loading-spinner"></div>

        <span>
          Loading National Intelligence...
        </span>
      </div>
    );
  }


  /* =====================================
     ERROR
  ===================================== */

  if (!stats) {
    return (
      <div className="statistics-state error-state">

        <ShieldAlert size={28} />

        <span>
          Failed to load statistics.
        </span>

      </div>
    );
  }


  /* =====================================
     DATA
  ===================================== */

  const topVictimStates =
    Object.entries(
      stats.top_victim_states
    ) as [string, number][];

  const topCrimes =
    Object.entries(
      stats.top_crimes
    ) as [string, number][];

  const maxVictimCount =
    topVictimStates.reduce(
      (max, [, count]) =>
        Math.max(max, count),
      0
    );

  const maxCrimeCount =
    topCrimes.reduce(
      (max, [, count]) =>
        Math.max(max, count),
      0
    );

  const primaryCrime =
    Object.keys(stats.top_crimes)[0]
      ?.replace(/_/g, " ") ||
    "N/A";

  const extractionMethod =
    Object.keys(
      stats.top_cashout_terminals
    )[0] || "N/A";


  return (
    <div className="statistics-page">

      <div className="statistics-container">

        {/* =================================
            PAGE HEADER
        ================================= */}

        <header className="statistics-header">

          <div className="header-title">

            <div className="header-icon">
              <Activity size={24} />
            </div>

            <div>

              <h1>
                Nationwide Threat Analytics
              </h1>

              <p>
                Aggregate cybercrime intelligence
                and statistical indicators.
              </p>

            </div>

          </div>


          <div className="data-source">

            <span className="source-dot"></span>

            <span>
              NCRP Intelligence Data
            </span>

          </div>

        </header>


        {/* =================================
            KPI CARDS
        ================================= */}

        <section className="kpi-grid">


          {/* Total Cases */}

          <div className="kpi-card">

            <div className="kpi-top">

              <span>
                Total Active Cases
              </span>

              <div className="kpi-icon blue">
                <ShieldAlert size={18} />
              </div>

            </div>

            <div className="kpi-value">
              {stats.total_complaints.toLocaleString()}
            </div>

            <div className="kpi-caption">
              Registered cybercrime complaints
            </div>

          </div>


          {/* Funds */}

          <div className="kpi-card">

            <div className="kpi-top">

              <span>
                Total Defrauded Funds
              </span>

              <div className="kpi-icon green">
                <IndianRupee size={18} />
              </div>

            </div>

            <div className="kpi-value money">
              ₹
              {(
                stats.total_defrauded_amount /
                10000000
              ).toFixed(2)}{" "}
              Cr
            </div>

            <div className="kpi-caption">
              Reported financial loss
            </div>

          </div>


          {/* Crime */}

          <div className="kpi-card">

            <div className="kpi-top">

              <span>
                Primary Crime Modus
              </span>

              <div className="kpi-icon red">
                <AlertTriangle size={18} />
              </div>

            </div>

            <div className="kpi-value kpi-text">
              {primaryCrime}
            </div>

            <div className="kpi-caption">
              Most frequently reported category
            </div>

          </div>


          {/* Extraction */}

          <div className="kpi-card">

            <div className="kpi-top">

              <span>
                Top Extraction Method
              </span>

              <div className="kpi-icon navy">
                <TrendingUp size={18} />
              </div>

            </div>

            <div className="kpi-value kpi-text">
              {extractionMethod}
            </div>

            <div className="kpi-caption">
              Highest frequency cash-out terminal
            </div>

          </div>

        </section>


        {/* =================================
            ANALYTICS GRID
        ================================= */}

        <section className="analytics-grid">


          {/* =================================
              VICTIM STATES
          ================================= */}

          <div className="analytics-card">

            <div className="analytics-card-header">

              <div className="analytics-heading">

                <div className="analytics-icon">
                  <BarChart3 size={17} />
                </div>

                <div>
                  <h2>
                    Most Affected Victim States
                  </h2>

                  <p>
                    Distribution of reported victims
                  </p>
                </div>

              </div>

            </div>


            <div className="analytics-body">

              {topVictimStates.map(
                ([state, count]) => (

                  <div
                    className="bar-item"
                    key={state}
                  >

                    <div className="bar-label">

                      <span>
                        {state}
                      </span>

                      <strong>
                        {count.toLocaleString()}{" "}
                        Victims
                      </strong>

                    </div>


                    <div className="bar-track">

                      <div
                        className="bar-fill victim-bar"
                        style={{
                          width: `${
                            maxVictimCount
                              ? (count /
                                  maxVictimCount) *
                                100
                              : 0
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* =================================
              CRIME CATEGORIES
          ================================= */}

          <div className="analytics-card">

            <div className="analytics-card-header">

              <div className="analytics-heading">

                <div className="analytics-icon warning">
                  <AlertTriangle size={17} />
                </div>

                <div>

                  <h2>
                    Crime Category Distribution
                  </h2>

                  <p>
                    Reported cybercrime classifications
                  </p>

                </div>

              </div>

            </div>


            <div className="analytics-body">

              {topCrimes.map(
                ([crime, count]) => (

                  <div
                    className="bar-item"
                    key={crime}
                  >

                    <div className="bar-label">

                      <span>
                        {crime.replace(
                          /_/g,
                          " "
                        )}
                      </span>

                      <strong>
                        {count.toLocaleString()}{" "}
                        Cases
                      </strong>

                    </div>


                    <div className="bar-track">

                      <div
                        className="bar-fill crime-bar"
                        style={{
                          width: `${
                            maxCrimeCount
                              ? (count /
                                  maxCrimeCount) *
                                100
                              : 0
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* =================================
            DATA NOTE
        ================================= */}

        <div className="statistics-note">

          <ShieldAlert size={14} />

          <span>
            Intelligence displayed for authorized
            government personnel. Statistics are
            intended for operational analysis and
            decision support.
          </span>

        </div>

      </div>

    </div>
  );
};

export default Statistics;
