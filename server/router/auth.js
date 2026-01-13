const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const sgMail = require('@sendgrid/mail');

// ✅ Set SendGrid API Key
const API_KEY = "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";
sgMail.setApiKey(API_KEY);

require('../db/conn');
const User = require('../model/userSchema');

let tempList;

// ✅ Test Route
router.get("/", (req, res) => {
  res.send("Yess!!! Server is running");
});

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword, phone, address } = req.body;

  if (!name || !email || !phone || !address || !password || !cpassword) {
    return res.status(400).json({ error: "Please fill the data properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = new User({ name, email, password, cpassword, phone, address });
    const userRegister = await user.save();

    if (userRegister) {
      const message = {
        to: `${email}`,
        from: 'dangerouspanditain@gmail.com',
        subject: 'Successfully Registered!!',
        text: `Congratulations ${name}, You have been successfully registered`
      };

      // Send registration mail
      sgMail
        .send(message)
        .then(() => console.log("Message sent"))
        .catch(err => console.log(err));

      res.status(200).json({ message: "Registration Successful" });
    } else {
      return res.status(400).json({ error: "Failed to register" });
    }

  } catch (err) {
    console.log(err);
  }
});

// ✅ Signin Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟢 Received:", email, password);

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter data" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log("🟣 Found user:", userLogin);

    if (!userLogin) {
      return res.status(400).json({ error: "User not registered" });
    }

    console.log("🟢 Received password:", password);
    console.log("🔵 Stored hash:", userLogin.password);

    const isMatch = await bcrypt.compare(password.trim(), userLogin.password);
    console.log("🟠 Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = await userLogin.generateAuthToken();

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
    });

    if (userLogin.role === "admin") {
      return res.status(200).json({ message: "Admin login successful", role: "admin", token });
    } else {
      return res.status(200).json({ message: "User login successful", role: "user", token });
    }

  } catch (err) {
    console.log("🔴 Error:", err);
  }
});

// // ✅ Fix Admin Password (use once if password mismatch)
// router.get("/fix-admin-password", async (req, res) => {
//   try {
//     const admin = await User.findOne({ email: "admin@gmail.com" });
//     if (!admin) return res.status(404).send("Admin not found");

//     const newHashed = await bcrypt.hash("admin", 10);
//     admin.password = newHashed;
//     admin.cpassword = newHashed;
//     await admin.save();

//     res.send("✅ Admin password rehashed successfully");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fixing admin password");
//   }
// });

// ✅ Get User Data (Protected)
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// ✅ Post Grievance
router.post("/grievance", authenticate, async (req, res) => {
  try {
    const { name, email, phone, dept, grievance } = req.body;

    if (!name || !email || !phone || !grievance) {
      console.log("Empty data in grievance portal");
      return res.status(400).json({ error: "Please fill all the details" });
    }

    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMsg = await userContact.addGrievance(name, email, phone, dept, grievance);
      await userContact.save();

      const message = {
        to: `${email}`,
        from: 'dangerouspanditain@gmail.com',
        subject: 'Grievance Filed!!',
        text: `${name}, Your grievance has been successfully filed`
      };

      sgMail
        .send(message)
        .then(() => console.log("Message sent"))
        .catch(err => console.log(err));

      return res.status(200).json({ message: "Grievance Filed Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});
// GET /about - Protected route that returns current user's profile
router.get("/about", authenticate, (req, res) => {
  try {
    // authenticate middleware should set req.rootUser (or req.user)
    const user = req.rootUser || req.user;
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Only return the fields the frontend needs
    const payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      grievances: user.grievances || []
    };

    return res.status(200).json(payload);
  } catch (err) {
    console.error("Error in /about:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ Grievance List
router.get("/grievancelist", async (req, res) => {
  try {
    const grievanceList = await User.find(
      { grievances: { "$not": { "$size": 0 } } },
      { grievances: 1 }
    );
    tempList = grievanceList;

    if (!grievanceList) {
      return res.status(400).send();
    } else {
      res.status(200).send(grievanceList);
    }
  } catch (err) {
    console.log(err);
  }
});

// ✅ Department Filter Example (Education)
router.get("/education", async (req, res) => {
  try {
    const grievanceList = await User.find(
      { grievances: { "$not": { "$size": 0 } } },
      { grievances: 1 }
    );
    tempList = grievanceList;

    if (!grievanceList) {
      return res.status(400).send();
    } else {
      res.status(200).send(grievanceList);
    }
  } catch (err) {
    console.log(err);
  }
});

// ✅ Get User by Name (Admin)
router.get("/users/:name", async (req, res) => {
  try {
    const myname = req.params.name;
    const userData = await User.find({ name: myname });

    if (!userData) {
      return res.status(400).send();
    } else {
      res.status(200).send(userData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// ✅ Update User (example)
router.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUsers = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).send(updateUsers);
  } catch (err) {
    res.status(400).send(err);
  }
});

// ✅ Update Grievance (Admin)
router.post("/aAbBcC/updatedocs", async (req, res) => {
  try {
    const { email, dept, _id, gId, status, feedback } = req.body;

    if (!email || !dept || !_id || !gId || !status || !feedback) {
      return res.status(400).json({ message: "Please send data" });
    }

    await User.updateOne(
      { _id },
      {
        $set: {
          'grievances.$[g].status': status,
          'grievances.$[g].feedback': feedback
        }
      },
      { arrayFilters: [{ 'g._id': gId }] }
    );

    const message = {
      to: `${email}`,
      from: 'dangerouspanditain@gmail.com',
      subject: 'An update found',
      text: `Hello, ${dept} Department had an update on your grievance number ${gId} and the status has been updated to ${status}. Feedback: ${feedback}`
    };

    sgMail
      .send(message)
      .then(() => console.log("Message sent"))
      .catch(err => console.log(err));

    console.log("Grievance Updated Successfully");
    return res.status(200).json({ message: "Message updated" });

  } catch (err) {
    return res.status(400).json({ error: "Could not update" });
  }
});

// ✅ Logout
router.get("/logout", (req, res) => {
  res.clearCookie('jwtoken', { path: "/" });
  res.status(200).send("Logout Successful");
});

// ✅ Create Admin (use only once)// ✅ Create Admin (use only once)
router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      return res.send("Admin already exists");
    }

    // ⚠️ Don’t hash manually — pre('save') will hash automatically
    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      cpassword: "admin123",
      phone: 9999999999,
      address: "Head Office",
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully (email: admin@gmail.com, password: admin123)");
    res.send("✅ Admin created successfully (email: admin@gmail.com, password: admin123)");
  } catch (err) {
    console.log("❌ Error creating admin:", err);
    res.status(500).send("Error creating admin");
  }
});


module.exports = router;
