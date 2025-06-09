import { useState } from "react";
import { FaTachometerAlt, FaUser, FaAddressBook, FaCog, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);

  return (
    <div className="bg-dark text-white p-3 vh-100 position-fixed" style={{ width: "250px" }}>
      <h4 className="mb-4">My CRM</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <FaTachometerAlt className="me-2" />
            Dashboard
          </Link>
        </li>

        {/* Leads dropdown */}
        <li className="nav-item">
          <button
            className="nav-link text-white d-flex align-items-center w-100 bg-transparent border-0 text-start"
            onClick={() => setIsLeadsOpen(!isLeadsOpen)}
          >
            <FaUser className="me-2" />
            Leads
            <FaChevronDown className="ms-auto" style={{ fontSize: "0.8rem" }} />
          </button>
          {isLeadsOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link to="/leads" className="nav-link text-white-50">
                  Show Leads
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/leadsform" className="nav-link text-white-50">
                  Add Lead
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <Link to="/followups" className="nav-link text-white">
            <FaTachometerAlt className="me-2" />
            Follow-ups
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/contacts" className="nav-link text-white">
            <FaAddressBook className="me-2" />
            Contacts
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">
            <FaCog className="me-2" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
