const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* SERVE FRONTEND FILES */
app.use(express.static(path.join(__dirname, "public")));

/* REGISTER USER */
app.post("/register", (req, res) => {
    const file = "registration.json";
    let users = [];

    if (fs.existsSync(file)) {
        users = JSON.parse(fs.readFileSync(file));
    }

    users.push(req.body);
    fs.writeFileSync(file, JSON.stringify(users, null, 2));

    res.json({ message: "Registered successfully" });
});

/* ADMIN – VIEW USERS */
app.get("/users", (req, res) => {
    if (req.query.password !== "admin123") {
        return res.status(401).json({ message: "Access denied" });
    }

    const users = fs.existsSync("registration.json")
        ? JSON.parse(fs.readFileSync("registration.json"))
        : [];

    res.json(users);
});

/* SPEAKERS */
app.get("/speakers", (req, res) => {
    res.json([
        { name: "Dr. Alan Smith", title: "AI Scientist", image: "image.jpg" },
        { name: "Ms. Sophia Lee", title: "Data Scientist", image: "image.jpg" },
        { name: "Mr. John Carter", title: "Cloud Architect", image: "image.jpg" }
    ]);
});

/* 🔥 MOST IMPORTANT LINE */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on all devices at port ${PORT}`);
});
