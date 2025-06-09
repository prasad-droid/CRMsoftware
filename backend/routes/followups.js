const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection
const authenticate = require('../middleware/auth');

// GET all follow-ups
router.get('/', authenticate, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  

  // Fetch all follow-ups with lead and user details
  const sql = 'SELECT f.*, l.name AS lead_name, u.name AS user_name FROM followups f JOIN leads l ON f.lead_id = l.id JOIN users u ON f.user_id = u.id ORDER BY f.followup_date ASC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching follow-ups' });
    res.json(results);
  });
});

// CREATE a follow-up
router.post('/', authenticate, (req, res) => {
  const { lead_id, note, followup_date } = req.body;
  const user_id = req.user.id;

  const sql = 'INSERT INTO followups (lead_id, user_id, note, followup_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [lead_id, user_id, note, followup_date], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error creating follow-up' });
    res.json({ message: 'Follow-up created', followupId: result.insertId });
  });
});

// GET follow-ups for a lead
router.get('/:leadId', authenticate, (req, res) => {
  const { leadId } = req.params;
  const sql = 'SELECT * FROM followups WHERE lead_id = ? ORDER BY followup_date ASC';
  db.query(sql, [leadId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching follow-ups' });
    res.json(results);
  });
});

// UPDATE a follow-up
router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { note, followup_date, status } = req.body;

  const sql = 'UPDATE followups SET note = ?, followup_date = ?, status = ? WHERE id = ?';
  db.query(sql, [note, followup_date, status, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error updating follow-up' });
    res.json({ message: 'Follow-up updated' });
  });
});

// DELETE a follow-up
router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM followups WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting follow-up' });
    res.json({ message: 'Follow-up deleted' });
  });
});

module.exports = router;
