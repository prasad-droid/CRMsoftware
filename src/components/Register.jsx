import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import api from '../api'; 

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  try {
    const res = await api.post('/auth/register', {
      name,
      email,
      password
    });

    console.log(res.data.message); // "User registered"
    navigate('/login')
  } catch (err) {
    console.error(err.response?.data?.error || 'Registration failed');
  }
};



  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
