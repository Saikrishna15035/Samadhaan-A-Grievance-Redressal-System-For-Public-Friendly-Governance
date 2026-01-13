import React, { useEffect, useState } from 'react';
import '../styles/Grievance.css';
import bgImage from '../images/grievancesubmitting.jpeg'; 
import support from '../images/complainticon.jpg'; 

const Grievance = () => {
  const [userData, setUserData] = useState({
    name: "", email: "", phone: "", dept: "", grievance: ""
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { userContact(); }, []);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const fileGrievance = async (event) => {
    event.preventDefault();
    const { name, email, phone, dept, grievance } = userData;
    const res = await fetch("/grievance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, dept, grievance }),
    });
    const data = await res.json();

    if (!data) {
      window.alert("Try to relogin. Your grievance was not filed!");
    } else {
      alert("✅ Grievance Filed Successfully! We'll inform you when there will be a response.");
      setUserData({ ...userData, grievance: "" });
    }
  };

  return (
    <div className="grievance-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay"></div>

      <div className="container grievance-card">
        <div className="form-header">
          <img src={support} alt="support" className="header-img" />
          <h2>File a Grievance</h2>
          <p>We’re here to listen and help resolve your issues promptly.</p>
        </div>

        <form method="POST" onSubmit={fileGrievance}>
          <div className="row g-3">
            <div className="col-md-4">
              <input type="text" name="name" className="form-control" value={userData.name}
                onChange={handleInputs} placeholder="Your Name" required />
            </div>
            <div className="col-md-4">
              <input type="email" name="email" className="form-control" value={userData.email}
                onChange={handleInputs} placeholder="Your Email" required />
            </div>
      
            <div className="col-md-4">
              <input type="text" name="phone" className="form-control" value={userData.phone}
                onChange={handleInputs} placeholder="Your Phone Number" required />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="dept" className="form-label">Choose Department : </label>
            <select
  name="dept"
  id="dept"
  className="form-select"
  onChange={handleInputs}
  value={userData.dept}
  required
>
  <option value="">-- Select Department / Organization --</option>

  {/* === Telangana State Departments === */}
  <option value="Agriculture and Co-operation">Agriculture and Co-operation</option>
  <option value="Backward Classes Welfare">Backward Classes Welfare</option>
  <option value="Consumer Affairs, Food & Civil Supplies">Consumer Affairs, Food & Civil Supplies</option>
  <option value="Endowments">Endowments</option>
  <option value="Energy">Energy</option>
  <option value="Environment, Forests, Science and Technology">Environment, Forests, Science and Technology</option>
  <option value="Finance">Finance</option>
  <option value="Health, Medical & Family Welfare">Health, Medical & Family Welfare</option>
  <option value="Higher Education">Higher Education</option>
  <option value="Home">Home</option>
  <option value="Housing">Housing</option>
  <option value="Industries and Commerce">Industries and Commerce</option>
  <option value="Information and Public Relations">Information and Public Relations</option>
  <option value="Information Technology, Electronics & Communications">Information Technology, Electronics & Communications</option>
  <option value="Irrigation and Command Area Development">Irrigation and Command Area Development (CAD)</option>
  <option value="Labour, Employment Training and Factories">Labour, Employment Training and Factories</option>
  <option value="Law">Law</option>
  <option value="Minorities Welfare">Minorities Welfare</option>
  <option value="Municipal Administration & Urban Development">Municipal Administration & Urban Development (MA&UD)</option>
  <option value="Panchayat Raj and Rural Development">Panchayat Raj and Rural Development</option>
  <option value="Planning">Planning</option>
  <option value="Public Enterprises">Public Enterprises</option>
  <option value="Revenue">Revenue</option>
  <option value="Revenue (Registration and Stamps)">Revenue (Registration and Stamps)</option>
  <option value="School Education (SE Wing)">School Education (SE Wing)</option>
  <option value="Social Welfare">Social Welfare</option>
  <option value="Transport, Roads and Buildings">Transport, Roads and Buildings</option>
  <option value="Women Development, Child Welfare and Disabled Welfare">Women Development, Child Welfare and Disabled Welfare</option>
  <option value="Youth Advancement, Tourism and Culture">Youth Advancement, Tourism and Culture</option>

  {/* === Major Public Sector Undertakings (PSUs) === */}
  <option value="Telangana State Civil Supplies Corporation Ltd">Telangana State Civil Supplies Corporation Ltd</option>
  <option value="Telangana State Medical Services & Infrastructure Corporation">Telangana State Medical Services & Infrastructure Corporation</option>
  <option value="Telangana State Seeds Development Corporation Ltd">Telangana State Seeds Development Corporation Ltd</option>
  <option value="Telangana State Warehousing Corporation">Telangana State Warehousing Corporation</option>
  <option value="Telangana State Horticulture Development Corporation Ltd">Telangana State Horticulture Development Corporation Ltd</option>
  <option value="Telangana State Renewable Energy Development Corporation Ltd">Telangana State Renewable Energy Development Corporation Ltd (TSREDCO)</option>
  <option value="Telangana State Power Generation Corporation Ltd">Telangana State Power Generation Corporation Ltd (TSGENCO)</option>
  <option value="Transmission Corporation of Telangana Ltd">Transmission Corporation of Telangana Ltd (TSTRANSCO)</option>
  <option value="Southern Power Distribution Company of Telangana Ltd">Southern Power Distribution Company of Telangana Ltd (TSSPDCL)</option>
  <option value="Northern Power Distribution Company of Telangana Ltd">Northern Power Distribution Company of Telangana Ltd (TSNPDCL)</option>
  <option value="Telangana State Industrial Infrastructure Corporation Ltd">Telangana State Industrial Infrastructure Corporation Ltd (TSIIC)</option>
  <option value="Telangana State Tourism Development Corporation Ltd">Telangana State Tourism Development Corporation Ltd (TSTDC)</option>
  <option value="Hyderabad Metro Rail Ltd">Hyderabad Metro Rail Ltd (HMRL)</option>
  <option value="Telangana State Road Transport Corporation">Telangana State Road Transport Corporation (TSRTC)</option>
  <option value="Telangana State Housing Corporation Ltd">Telangana State Housing Corporation Ltd</option>
  <option value="Telangana State Police Housing Corporation Ltd">Telangana State Police Housing Corporation Ltd</option>
  <option value="Telangana State Forest Development Corporation Ltd">Telangana State Forest Development Corporation Ltd</option>
</select>
          </div>

          <div className="mt-4">
            <textarea name="grievance" className="form-control" rows="5"
              placeholder="Describe your grievance clearly..."
              onChange={handleInputs} value={userData.grievance}></textarea>
          </div>

          <div className="mt-4">
            <label className="form-label">Upload Supporting Document</label>
            <input type="file" id="myFile" name="filename" className="form-control file-input" />
          </div>

{/* Button row -> use full-width column to avoid layout issues */}
<div className="row mt-5">
  <div className="col-12 d-flex justify-content-center">
    <button type="submit" className="btn btn-gradient submit-btn">
      Submit Grievance
    </button>
  </div>
</div>




        </form>
      </div>
    </div>
  );
};

export default Grievance;