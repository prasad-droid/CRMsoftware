import React, { useEffect, useState } from "react";
import api from "../api"; // axios instance with baseURL and auth if needed

export default function FollowupsTable() {
  const [followups, setFollowups] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchFollowups();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [query, followups]);

  const fetchFollowups = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/followups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowups(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching followups:", err);
    }
  };

  const applyFilter = () => {
    const lowerQuery = query.toLowerCase();
    const filteredData = followups.filter(
      (f) =>
        f.note.toLowerCase().includes(lowerQuery) ||
        f.lead_name?.toLowerCase().includes(lowerQuery) ||
        f.user_name?.toLowerCase().includes(lowerQuery)
    );
    setFiltered(filteredData);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this follow-up?"))
      return;

    try {
      await api.delete(`/followups/${id}`);
      const updated = followups.filter((f) => f.id !== id);
      setFollowups(updated);
      setFiltered(updated);
      alert("Follow-up deleted.");
    } catch (err) {
      console.error(err);
      alert("Error deleting follow-up.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Follow-ups</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by note, lead, or user"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Lead</th>
            <th>Note</th>
            <th>Follow-up Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((f, idx) => (
            <tr key={f.id}>
              <td>{idx + 1}</td>
              <td>{f.lead_name}</td>
              <td>{f.note}</td>
              <td>{new Date(f.followup_date).toLocaleDateString()}</td>
              <td>{f.user_name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(f.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No follow-ups found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
