const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all leads
router.get("/", (req, res) => {
  db.query(`SELECT leads.*, users.name AS assigned_to_name
            FROM leads
            LEFT JOIN users ON leads.assigned_to = users.id`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST create new lead
router.post("/", (req, res) => {
  const { name, email, phone, source, notes, assigned_to } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  db.query(
    "INSERT INTO leads (name, email, phone, source, notes, assigned_to) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, source, notes, assigned_to || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({
          message: "Lead created successfully",
          leadId: result.insertId,
        });
    }
  );
});

// DELETE lead by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM leads WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  });
});

// UPDATE lead by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, source, status, notes, assigned_to } = req.body;

  // Validate required fields if needed
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const query = ' \
    UPDATE leads \
    SET name = ?, email = ?, phone = ?, source = ?, status = ?, notes = ?, assigned_to = ? \
    WHERE id = ? ';

  db.query(
    query,
    [name, email, phone, source, status, notes, assigned_to, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Lead not found" });
      }

      res.json({ message: "Lead updated successfully" });
    }
  );
});

module.exports = router;
