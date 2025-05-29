import React, { useState, useEffect } from 'react';
import api from "../api";

const AddLeads = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    status: 'new',
    notes: '',
    assigned_to: ''
  });

  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    api.get('/users') // Replace with your actual users endpoint
      .then((res) => {setUsers(res.data);console.log(res.data)})
      .catch(err => console.error('Failed to load users:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Lead:', formData);
    api.post('/leads', formData)
    .catch((err)=>{"Error Occured : "+err})
  };

  return (
    <div className="container mt-4">
      <h2>Create Lead</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name"
                 value={formData.name} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email"
                 value={formData.email} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone"
                 value={formData.phone} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="source" className="form-label">Source</label>
          <input type="text" className="form-control" id="source" name="source"
                 value={formData.source} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" name="status"
                  value={formData.status} onChange={handleChange}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="assigned_to" className="form-label">Assigned To</label>
          <select className="form-select" id="assigned_to" name="assigned_to"
                  value={formData.assigned_to} onChange={handleChange}>
            <option value="">-- Select User --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea className="form-control" id="notes" name="notes" rows="4"
                    value={formData.notes} onChange={handleChange}></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create Lead</button>
        </div>
      </form>
    </div>
  );
};

export default AddLeads;
