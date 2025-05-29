import React, { useState, useEffect } from "react";
import api from "../api";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [user, setUsers] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedLead, setSelectedLead] = useState([]);

  useEffect(() => {
    api
      .get("/leads")
      .then((res) => {
        setLeads(res.data);
        setFilteredLeads(res.data);
      })
      .catch((err) => console.error("Error fetching leads:", err));

    api
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error("Error fetching users :", err));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [query, sourceFilter, statusFilter, leads]);

  const applyFilters = () => {
    let filtered = leads;

    if (query) {
      filtered = filtered.filter(
        (row) =>
          row.name.toLowerCase().includes(query.toLowerCase()) ||
          row.email.toLowerCase().includes(query.toLowerCase()) ||
          row.phone.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sourceFilter) {
      filtered = filtered.filter((row) => row.source === sourceFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((row) => row.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const sortColumn = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

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

    try {
      await api.delete(`/leads/${id}`);
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      alert("Lead deleted successfully!");
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Failed to delete lead.");
    }
  };

  // Extract unique sources and statuses for filters
  const uniqueSources = [...new Set(leads.map((lead) => lead.source))];
  const uniqueStatuses = [...new Set(leads.map((lead) => lead.status))];

  const openUpdateModal = (lead) => {
    setSelectedLead(lead);
    setTimeout(() => {
      const modalElement = document.getElementById("updateLeadModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  };
  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Leads Table</h2>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">Filter by Source</option>
              {uniqueSources.map((source, i) => (
                <option key={i} value={source}>
                  {source}
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
              <option value="">Filter by Status</option>
              {uniqueStatuses.map((status, i) => (
                <option key={i} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th
                onClick={() => sortColumn("id")}
                style={{ cursor: "pointer" }}
              >
                #
              </th>
              <th
                onClick={() => sortColumn("name")}
                style={{ cursor: "pointer" }}
              >
                Name
              </th>
              <th
                onClick={() => sortColumn("email")}
                style={{ cursor: "pointer" }}
              >
                Email
              </th>
              <th
                onClick={() => sortColumn("phone")}
                style={{ cursor: "pointer" }}
              >
                Phone
              </th>
              <th
                onClick={() => sortColumn("source")}
                style={{ cursor: "pointer" }}
              >
                Source
              </th>
              <th
                onClick={() => sortColumn("status")}
                style={{ cursor: "pointer" }}
              >
                Status
              </th>
              <th
                onClick={() => sortColumn("notes")}
                style={{ cursor: "pointer" }}
              >
                Note
              </th>
              <th
                onClick={() => sortColumn("assigned_to")}
                style={{ cursor: "pointer" }}
              >
                Assign To
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.source}</td>
                <td>{row.status}</td>
                <td>{row.notes}</td>
                <td>{row.assigned_to_name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={(e) => {
                      openUpdateModal(row);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      handleDelete(row.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedLead && (
        <UpdateLeadModal
          lead={selectedLead}
          users={user}
          onSave={(updatedLead) => {
            api.put(`/leads/${updatedLead.id}`, updatedLead).then(() => {
              const updatedList = leads.map((l) =>
                l.id === updatedLead.id ? updatedLead : l
              );
              setLeads(updatedList);
              setFilteredLeads(updatedList);
              alert("Lead updated!");
            });
          }}
          uniqueSources = {uniqueSources}
        />
      )}
    </>
  );
}

const UpdateLeadModal = ({ lead, users,onSave,uniqueSources}) => {
  const [formData, setFormData] = useState({ ...lead });

  useEffect(() => {
    setFormData({ ...lead }); // Update when a new lead is passed in
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("updateLeadModal")
    );
    modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="updateLeadModal"
      tabIndex="-1"
      aria-labelledby="updateLeadModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateLeadModalLabel">
              Update Lead
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Source</label>
              <select
              className="form-select"
              value={formData.source}
              onChange={handleChange}
            >
              {uniqueSources.map((source, i) => (
                <option key={i} value={source}>
                  {source}
                </option>
              ))}
            </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
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
              <label className="form-label">Assigned To</label>
              <select
                name="assigned_to"
                className="form-select"
                value={formData.assigned_to}
                onChange={handleChange}
              >
                <option value="">-- Select User --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                className="form-control"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
