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

  const filteredLeads = filterStatus
    ? leads.filter((lead) => lead.status === filterStatus)
    : leads;

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

  useEffect(() => {
    api
      .get("/leads")
      .then((res) => setLeads(res.data))
      .catch(console.error);
  }, []);

  const countBy = (key) => {
    return leads.reduce((acc, lead) => {
      acc[lead[key]] = (acc[lead[key]] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = countBy("status");
  const sourceCounts = countBy("source");

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
                onClick={() => setFilterStatus(status)} // Add filter logic
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

      {/* Charts */}
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
              data={leadsBySource}
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
              data={leadsPerMonth}
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

      {/* Recent Leads */}
      <div className="card">
        <div className="card-header">Recent Leads</div>
        <ul className="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}
