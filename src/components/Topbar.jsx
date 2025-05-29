import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
      <div className="d-flex align-items-center">
        <FaSearch className="me-2" />
        <input type="text" className="form-control" placeholder="Search..." style={{ maxWidth: "300px" }} />
      </div>
      <div>
        <FaBell className="me-3" />
        <FaUserCircle />
      </div>
    </div>
  );
}
