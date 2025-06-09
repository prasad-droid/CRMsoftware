const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/Auth");
const db = require("../db");

// GET profile details
router.get("/profile", authenticate, (req, res) => {
  const userId = req.user.id;
  // console.log("Fetching profile for user ID:", userId);
  const sql = "SELECT id, name, email, role FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.json(results[0]);
  });
});

module.exports = router;
