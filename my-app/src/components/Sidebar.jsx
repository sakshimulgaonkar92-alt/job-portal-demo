import React from "react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "jobs", label: "Jobs" },
  { id: "applications", label: "Applications" },
  { id: "profile", label: "Profile" },
];

function Sidebar({ studentName = "Student", activeTab, onTabChange, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="profile-avatar">{studentName.charAt(0)}</div>
        <h3>{studentName}</h3>
        <p>Job Seeker</p>
      </div>

      <nav className="side-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </aside>
  );
}

export default Sidebar;