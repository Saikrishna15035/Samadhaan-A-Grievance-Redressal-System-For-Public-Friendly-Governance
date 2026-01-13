import React, { useEffect, useState } from "react";
import "../styles/about.css";

const About = () => {
  const [userData, setUserData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const callAboutPage = async () => {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("Error loading /about:", err);
      setErrMsg(err.message || "Failed to load profile");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="about-container">
        <div className="card small-card">Loading profile…</div>
      </div>
    );
  }

  if (errMsg || !userData) {
    return (
      <div className="about-container">
        <div className="card error-card">
          <h4>Unable to load data</h4>
          <p>{errMsg || "Try refreshing or relogin."}</p>
        </div>
      </div>
    );
  }

  const grievances = Array.isArray(userData.grievances) ? userData.grievances : [];

  return (
    <div className="about-container">
      <h2 className="page-title">My Profile</h2>

      {/* Personal Info Card */}
      <div className="card info-card">
        <h3 className="card-title">Personal Information</h3>
        <div className="info-grid">
          <div className="info-row">
            <div className="info-label">Name</div>
            <div className="info-value">{userData.name || "—"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Address</div>
            <div className="info-value">{userData.address || "—"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Contact No</div>
            <div className="info-value">{userData.phone || "—"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Email</div>
            <div className="info-value">{userData.email || "—"}</div>
          </div>
        </div>
      </div>

      {/* Grievances Card */}
      <div className="card grievances-card">
        <div className="grievances-header">
          <h3 className="card-title">Grievances</h3>
          <div className="grievance-count">Total: <strong>{grievances.length}</strong></div>
        </div>

        <div className="table-wrap">
          <table className="grievance-table">
            <colgroup>
              <col style={{ minWidth: 160 }} />
              <col style={{ minWidth: 120 }} />
              <col style={{ minWidth: 320 }} />
              <col style={{ minWidth: 120 }} />
              <col style={{ minWidth: 160 }} />
            </colgroup>
            <thead>
              <tr>
                <th>Date</th>
                <th>Department</th>
                <th>Grievance</th>
                <th>Status</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {grievances.length === 0 ? (
                <tr><td colSpan={5} className="text-center muted">No grievances found.</td></tr>
              ) : (
                grievances.map((g, i) => (
                  <tr key={g._id || i}>
                    <td className="small">{g.date ? new Date(g.date).toLocaleString() : "—"}</td>
                    <td>{g.dept || "—"}</td>
                    <td className="clamp-cell" title={g.grievance}>{g.grievance || "—"}</td>
                    <td>{g.status || "Not seen"}</td>
                    <td className="clamp-cell" title={g.feedback}>{g.feedback || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default About;
