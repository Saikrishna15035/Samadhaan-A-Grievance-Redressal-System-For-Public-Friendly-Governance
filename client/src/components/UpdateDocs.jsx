import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/admin.css"; // ensure path is correct

const UpdateDocs = () => {
  const [gId, setGId] = useState("");
  const [_id, setMId] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");
    const [dataFetched, setDataFetched] = useState(false);
  const [Data, setData] = useState({
    date: "", dept: "", email: "", feedback: "", grievance: "", name: "", phone: "", status: "", _id: ""
  });

  const getGrievance = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/grievancelist", {
        method: "GET",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      const obj = thisGrievance(data);
      if (obj) {
        setData(obj);
        setEmail(obj.email || "");
        setDept(obj.dept || "");
        setDataFetched(true);
      } else {
        alert("No grievance found with that ID.");
        setData(null);
        setDataFetched(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/aAbBcC/updatedocs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, dept, _id, gId, status, feedback }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        window.alert("Could not connect to backend");
      } else {
        window.alert("✅ Grievance Updated Successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const thisGrievance = (d) => {
    if (!Array.isArray(d)) return null;
    for (let i = 0; i < d.length; i++) {
      for (let j = 0; j < (d[i].grievances || []).length; j++) {
        if (d[i].grievances[j]._id === gId) {
          setMId(d[i]._id);
          return d[i].grievances[j];
        }
      }
    }
    return null;
  };

  return (
    <div className="container update-container my-5">
      {/* Top bar: Return (left) / (optional title) / Logout (right) */}
    <div className="topbar d-flex align-items-center justify-content-end mb-3">

        <div className="topbar-left">
          <Link to="/aAbBcC" className="btn btn-outline-secondary return-btn"> 〈 Return to Dashboard</Link>
        </div>

        <div className="topbar-center">
          <h2 className="dashboard-title mb-0">Update Grievances</h2>
          <small className="text-muted">Search and update grievance status or feedback</small>
        </div>

       
      </div>

      {/* Card */}
      <div className="card shadow-sm p-4">
        {/* Label (first line) */}
        <div className="mb-2">
          <label className="form-label fw-semibold">Enter the Grievance ID:</label>
        </div>

        {/* Input row (second line) 80% / 20% */}
        <form onSubmit={getGrievance}>
          <div className="getdata-row d-flex gap-2 mb-4">
            <input
              type="text"
              id="GId"
              name="GId"
              value={gId}
              onChange={(e) => setGId(e.target.value)}
              className="form-control id-input"
              placeholder="Enter Grievance ID to fetch details"
              required
            />
            {!dataFetched && (
              <button type="submit" className="btn btn-primary getdata-btn">
                Get Data
              </button>
            )}
          </div>
        </form>

        {/* Display fetched info */}
        {Data && Data.name ? (
          <>
            <div className="grievance-details mb-4">
              <div className="row mb-2">
                <strong className="col-sm-3">Name:</strong>
                <div className="col-sm-9">{Data.name}</div>
              </div>
              <div className="row mb-2">
                <strong className="col-sm-3">Phone:</strong>
                <div className="col-sm-9">{Data.phone}</div>
              </div>
              <div className="row mb-2">
                <strong className="col-sm-3">Email:</strong>
                <div className="col-sm-9">{Data.email}</div>
              </div>
              <div className="row mb-2">
                <strong className="col-sm-3">Department:</strong>
                <div className="col-sm-9">{Data.dept}</div>
              </div>
              <div className="row mb-3">
                <strong className="col-sm-3">Grievance:</strong>
                <div className="col-sm-9 grievance-text">{Data.grievance}</div>
              </div>
              <div className="row mb-3">
                <strong className="col-sm-3">Date Filed:</strong>
                <div className="col-sm-9">{Data.date}</div>
              </div>
            </div>

            {/* Update form: status then feedback below */}
            <form onSubmit={updateData}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <select
                  name="status"
                  id="status"
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">-- Select Status --</option>
                  <option value="Not Seen">Not Seen</option>
                  <option value="In Process">In Process</option>
                  <option value="Referred to concerned Authority">Referred to concerned Authority</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Feedback below status */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Feedback</label>
                <textarea
                  name="feedback"
                  className="form-control"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter feedback or remarks"
                />
              </div>

              {/* Hidden fields (main ID, this ID) so they POST too */}
              <input type="hidden" name="_id" value={_id} />
              <input type="hidden" name="gId" value={gId} />

              {/* Buttons: Update (left) and Return (right)*/}
              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-success update-left">Update Grievance</button>
                {/* <Link to="/aAbBcC" className="btn btn-outline-secondary return-right">Return to Dashboard</Link> */}
              </div> 
            </form>
          </>
        ) : (
          <p className="text-muted fst-italic">Enter a valid Grievance ID to load data.</p>
        )}
      </div>
    </div>
  );
};

export default UpdateDocs;
