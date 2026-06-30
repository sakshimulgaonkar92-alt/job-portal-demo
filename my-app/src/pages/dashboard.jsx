import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <header className="header">
        <h2>Student Dashboard</h2>
      </header>

      <div className="content">

        <aside className="sidebar">
          <button>Home</button>
          <button>Jobs</button>
          <button>Applications</button>
          <button>Profile</button>
        </aside>

        <main className="main">

          <div className="cards">
            <div className="card">
              <h3>120</h3>
              <p>Total Jobs</p>
            </div>

            <div className="card">
              <h3>18</h3>
              <p>Applied</p>
            </div>

            <div className="card">
              <h3>12</h3>
              <p>Saved</p>
            </div>
          </div>

          <div className="recent">
            <h3>Recent Jobs</h3>
            <ul>
              <li>Frontend Developer - TCS</li>
              <li>Java Developer - Infosys</li>
              <li>Web Developer Intern - Wipro</li>
            </ul>
          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;