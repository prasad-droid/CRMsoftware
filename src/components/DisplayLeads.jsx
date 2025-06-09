// LeadsTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFollowupLeadId, setShowFollowupLeadId] = useState(null);

  useEffect(() => {
    api.get("/leads").then((res) => {
      setLeads(res.data);
      setFilteredLeads(res.data);
    });
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    let filtered = leads;
    if (query) {
      filtered = filtered.filter((l) =>
        [l.name, l.email, l.phone].some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    if (sourceFilter)
      filtered = filtered.filter((l) => l.source === sourceFilter);
    if (statusFilter)
      filtered = filtered.filter((l) => l.status === statusFilter);
    setFilteredLeads(filtered);
  }, [query, sourceFilter, statusFilter, leads]);

  const sortColumn = (key) => {
    let direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sorted = [...filteredLeads].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredLeads(sorted);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    await api.delete(`/leads/${id}`);
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    setFilteredLeads(updated);
  };

  const uniqueSources = [...new Set(leads.map((l) => l.source))];
  const uniqueStatuses = [...new Set(leads.map((l) => l.status))];

  const openUpdateModal = (lead) => {
    setSelectedLead(lead);
    setTimeout(() => {
      new bootstrap.Modal(document.getElementById("updateLeadModal")).show();
    }, 100);
  };

  const openFollowupForm = (id) => {
    setShowFollowupLeadId(id);
    setTimeout(() => {
      new bootstrap.Modal(document.getElementById("followupModal")).show();
    }, 100);
  };

  return (
    <div className="container mt-4">
      <h2>Leads Table</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            {uniqueSources.map((src, i) => (
              <option key={i} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {uniqueStatuses.map((stat, i) => (
              <option key={i} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Note</th>
            <th>Assign To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead, i) => (
            <tr key={lead.id}>
              <td>{i + 1}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
              <td>{lead.notes}</td>
              <td>{lead.assigned_to_name}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openUpdateModal(lead)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => openFollowupForm(lead.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(lead.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLead && (
        <UpdateLeadModal
          lead={selectedLead}
          users={users}
          onSave={(updated) => {
            api.put(`/leads/${updated.id}`, updated).then(() => {
              const updatedList = leads.map((l) =>
                l.id === updated.id ? updated : l
              );
              setLeads(updatedList);
              setFilteredLeads(updatedList);
            });
          }}
          uniqueSources={uniqueSources}
        />
      )}

      <div className="modal fade" id="followupModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Follow-up</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {showFollowupLeadId && (
                <FollowupForm
                  leadId={showFollowupLeadId}
                  onClose={() => setShowFollowupLeadId(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UpdateLeadModal = ({ lead, users, onSave, uniqueSources }) => {
  const [formData, setFormData] = useState({ ...lead });
  useEffect(() => setFormData({ ...lead }), [lead]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    bootstrap.Modal.getInstance(
      document.getElementById("updateLeadModal")
    ).hide();
  };

  return (
    <div className="modal fade" id="updateLeadModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Lead</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body row g-3">
            <div className="col-md-6">
              <label>Name</label>
              <input
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Phone</label>
              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Source</label>
              <select
                className="form-select"
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                {uniqueSources.map((src, i) => (
                  <option key={i} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label>Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Assign To</label>
              <select
                className="form-select"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <label>Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FollowupForm = ({ leadId, onClose }) => {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(leadId, note, date, token);
      await api.post("/followups",{lead_id: leadId,note,followup_date: date,},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Follow-up added!");
      onClose();
    } catch (err) {
      alert("Error adding follow-up");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Note</label>
        <textarea
          className="form-control"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Follow-up Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Add Follow-up
      </button>
    </form>
  );
};
