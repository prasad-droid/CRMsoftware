import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
      <div className="d-flex align-items-center">
        <FaSearch className="me-2" />
        <input type="text" className="form-control" placeholder="Search..." style={{ maxWidth: "300px" }} />
      </div>
      <div>
        <FaBell className="me-3" />
        <Link to="/profile" className="text-decoration-none text-dark">
          <FaUserCircle />
          <span className="me-2">Profile</span>
          {/* Using FaUserCircle icon for profile */}
        </Link>
      </div>
    </div>
  );
}
