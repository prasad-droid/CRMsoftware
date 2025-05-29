import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Topbar />
        <div className="p-4">
          <Outlet /> {/* Renders nested route component here */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
