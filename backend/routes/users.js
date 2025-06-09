const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all leads
router.get("/", (req, res) => {
  db.query("SELECT * FROM users where role = 'agent' ", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;