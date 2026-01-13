import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.css";

const DEPARTMENTS = [
  "All",
  "Agriculture and Co-operation",
  "Backward Classes Welfare",
  "Consumer Affairs, Food & Civil Supplies",
  "Endowments",
  "Energy",
  "Environment, Forests, Science and Technology",
  "Finance",
  "Health, Medical & Family Welfare",
  "Higher Education",
  "Home",
  "Housing",
  "Industries and Commerce",
  "Information and Public Relations",
  "Information Technology, Electronics & Communications",
  "Irrigation and Command Area Development",
  "Labour, Employment Training and Factories",
  "Law",
  "Minorities Welfare",
  "Municipal Administration & Urban Development",
  "Panchayat Raj and Rural Development",
  "Planning",
  "Public Enterprises",
  "Revenue",
  "Revenue (Registration and Stamps)",
  "School Education (SE Wing)",
  "Social Welfare",
  "Transport, Roads and Buildings",
  "Women Development, Child Welfare and Disabled Welfare",
  "Youth Advancement, Tourism and Culture",
  "Telangana State Power Generation Corporation Ltd (TSGENCO)",
  "Transmission Corporation of Telangana Ltd (TSTRANSCO)",
  "Southern Power Distribution Company of Telangana Ltd (TSSPDCL)",
  "Northern Power Distribution Company of Telangana Ltd (TSNPDCL)",
  "Telangana State Industrial Infrastructure Corporation Ltd (TSIIC)",
  "Telangana State Tourism Development Corporation Ltd (TSTDC)",
  "Hyderabad Metro Rail Ltd (HMRL)",
  "Telangana State Road Transport Corporation (TSRTC)",
];

export default function AdminDashboard() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  // controls
  const [deptFilter, setDeptFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [query, setQuery] = useState("");

  // copy-to-clipboard state
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/grievancelist", {
          method: "GET",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        const flat = [];
        if (Array.isArray(data)) {
          data.forEach((group) => {
            if (Array.isArray(group.grievances)) {
              group.grievances.forEach((g) => flat.push({ ...g, _ts: Date.parse(g.date) || 0 }));
            }
          });
        }
        setAll(flat);
      } catch (err) {
        console.error("Failed to load grievances:", err);
        setAll([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const visible = useMemo(() => {
    let items = all.slice();
    if (deptFilter && deptFilter !== "All") {
      items = items.filter((i) => (i.dept || "").toLowerCase() === deptFilter.toLowerCase());
    }
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (i) =>
          (i.name || "").toLowerCase().includes(q) ||
          (i.email || "").toLowerCase().includes(q) ||
          (i.grievance || "").toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => (sortOrder === "latest" ? (b._ts || 0) - (a._ts || 0) : (a._ts || 0) - (b._ts || 0)));
    return items;
  }, [all, deptFilter, sortOrder, query]);

  // copy-to-clipboard function
  const copyId = async (id) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(id);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = id;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="admin-dashboard container my-4">
      {/* header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="dashboard-title">Samadhaan — Admin Dashboard</h2>
          <small className="text-muted">Filter, sort and manage citizen grievances</small>
        </div>
        <div className="top-actions">
          <Link to="/login" className="logout-btn">Logout as Admin</Link>
        </div>
      </div>

      {/* control rectangle split into 3 */}
      <div className="control-panel">
        <div className="control-item">
          <label>Filter by Department</label>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="control-item">
          <label>Sort by</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="control-item">
          <label>Search</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or text..."
          />
          <div className="search-buttons">
            <button type="button" onClick={() => setQuery("")}>Clear</button>
            <button type="button" onClick={() => { /* no-op: visible updates automatically */ }}>Search</button>
          </div>
        </div>
      </div>

      {/* totals */}
      <div className="summary">
        <span className="badge total-badge">Total: {all.length}</span>
        <span className="badge showing-badge">Showing: {visible.length}</span>
      </div>

      {/* table */}
      <div className="table-container">
        <table className="grievance-table">
          <colgroup>
            <col style={{ minWidth: 230 }} />
            <col style={{ minWidth: 250 }} />
            <col style={{ minWidth: 250 }} />
            <col style={{ minWidth: 100 }} />
            <col style={{ minWidth: 250 }} />
            <col style={{ minWidth: 500 }}/>
            <col style={{ minWidth: 150 }} />
            <col style={{ minWidth: 250 }} />
            <col style={{ minWidth: 200 }} />
          </colgroup>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Grievance</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{ textAlign: "center", padding: 18 }}>Loading...</td></tr>
            ) : visible.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: "center", padding: 18 }}>No records found</td></tr>
            ) : (
              visible.map((g) => (
                <tr key={g._id || Math.random()}>
                  <td className="id-cell clickable-id" onClick={() => copyId(g._id)} title="Click to copy ID">
                    {g._id}
                    {copiedId === g._id && <span className="copied-badge">Copied</span>}
                  </td>
                  <td>{g.name}</td>
                  <td className="email-cell">{g.email}</td>
                  <td style={{ textAlign: "center" }}>{g.phone}</td>
                  <td>{g.dept}</td>
                  <td className="text-cell" title={g.grievance}>{g.grievance}</td>
                  <td style={{ textAlign: "center" }}>{g.status || "Pending"}</td>
                  <td className="text-cell" title={g.feedback}>{g.feedback}</td>
                  <td style={{ textAlign: "center" }}>{g.date ? new Date(g.date).toLocaleString() : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* update documents centered bottom */}
      <div className="text-center mt-4">
        <Link to="/aAbBcC/updatedocs" className="update-btn">Update Documents</Link>
      </div>
    </div>
  );
}
