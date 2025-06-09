import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from './components/Dashboard'
import Home from "./components/Home";
import DisplayLeads from "./components/DisplayLeads";
import AddLeads from "./components/AddLeads";
import Login from "./components/Login";
import Register from './components/Register';
import PrivateRoute from "./components/PrivateRoute";
import FollowupsTable from "./components/FollowupsTable";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* All routes inside MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/leads" element={<DisplayLeads />} />
            <Route path="/followups" element={<FollowupsTable />} />
            <Route path="/leadsform" element={<AddLeads />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />

          {/* Private Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
