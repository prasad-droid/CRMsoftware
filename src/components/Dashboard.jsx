import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../api";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);

  // Apply status filter if set
  const filteredLeads = filterStatus
    ? leads.filter((lead) => lead.status === filterStatus)
    : leads;

  // Pie Chart Data: Leads by Status
  const pieData = {
    labels: [...new Set(filteredLeads.map((lead) => lead.status))],
    datasets: [
      {
        label: "Leads by Status",
        data: Object.values(
          filteredLeads.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
          }, {})
        ),
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
          "#6c757d",
        ],
      },
    ],
  };

  // Count leads by source and by month
  const leadsBySource = filteredLeads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});

  const leadsPerMonth = filteredLeads.reduce((acc, lead) => {
    const date = new Date(lead.created_at);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Convert those objects to chart-friendly format
  const barDataSource = {
    labels: Object.keys(leadsBySource),
    datasets: [
      {
        label: "Leads by Source",
        data: Object.values(leadsBySource),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const barDataMonth = {
    labels: Object.keys(leadsPerMonth),
    datasets: [
      {
        label: "Leads Per Month",
        data: Object.values(leadsPerMonth),
        backgroundColor: "#198754",
      },
    ],
  };

  // Fetch leads from API on load
  useEffect(() => {
    api
      .get("/leads")
      .then((res) => setLeads(res.data))
      .catch(console.error);
  }, []);

  // Summary cards (status counts)
  const countBy = (key) => {
    return leads.reduce((acc, lead) => {
      acc[lead[key]] = (acc[lead[key]] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = countBy("status");
  const totalLeads = leads.length;

  return (
    <div className="container">
      <h2 className="mb-4">Leads Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        {filterStatus && (
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => setFilterStatus(null)}
          >
            Clear Filter: {filterStatus}
          </button>
        )}

        {["new", "contacted", "in_progress", "converted", "lost"].map(
          (status) => (
            <div key={status} className="col-md-2 mb-3">
              <div
                className="card text-white bg-primary h-100"
                style={{ cursor: "pointer" }}
                onClick={() => setFilterStatus(status)}
              >
                <div className="card-body">
                  <h5 className="card-title text-capitalize">
                    {status.replace("_", " ")}
                  </h5>
                  <p className="card-text fs-4">{statusCounts[status] || 0}</p>
                </div>
              </div>
            </div>
          )
        )}

        <div className="col-md-2 mb-3">
          <div className="card bg-dark text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Total</h5>
              <p className="card-text fs-4">{totalLeads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="card-title">Leads by Status</h5>
            {filteredLeads.length ? (
              <Pie data={pieData} />
            ) : (
              <p className="text-muted">No data to display.</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h5 className="card-title">Leads by Source</h5>
            <Bar
              data={barDataSource}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className="card p-3">
            <h5 className="card-title">Leads Created Per Month</h5>
            <Bar
              data={barDataMonth}
              options={{
                responsive: true,
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Leads Placeholder */}
      <div className="card">
        <div className="card-header">Recent Leads</div>
        <ul className="list-group list-group-flush">
        {[...filteredLeads]
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 5)
  .map((lead) => (
    <li key={lead.id} className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          <strong>{lead.name}</strong> <br />
          <small className="text-muted">
            Source: {lead.source} | Status: {lead.status.replace("_", " ")}
          </small>
        </div>
        <div className="text-muted">
          {new Date(lead.created_at).toLocaleDateString()}
        </div>
      </div>
    </li>
  ))}

        </ul>
      </div>
    </div>
  );
}
