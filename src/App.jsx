import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from './components/Dashboard'
import Home from "./components/Home";
import DisplayLeads from "./components/DisplayLeads";
import AddLeads from "./components/AddLeads";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* All routes inside MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/leads" element={<DisplayLeads />} />
            <Route path="/leadsform" element={<AddLeads />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
