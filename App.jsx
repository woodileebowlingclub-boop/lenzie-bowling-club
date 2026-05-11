import "./App.css";
import logo from "./assets/logo.jpg";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    "Home",
    "Diary",
    "Notices",
    "Competitions",
    "Members",
    "Office Bearers",
    "Club Coaches",
    "Documents",
    "Admin Settings",
  ];

  const [files, setFiles] = useState({});

  function addFile(section, file) {
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    setFiles((prev) => ({
      ...prev,
      [section]: [
        ...(prev[section] || []),
        {
          name: file.name,
          url: fileUrl,
        },
      ],
    }));
  }

  return (
    <div className="app">
      <header className="topHeader">
        <div className="logoArea">
          <img src={logo} alt="Lenzie Bowling Club" className="clubLogo" />

          <div>
            <h1>Lenzie Bowling Club</h1>
            <p>Members App</p>
          </div>
        </div>

        <button className="logoutBtn">Log Out</button>
      </header>

      <nav className="menuBar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab activeTab" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="contentArea">
        <div className="welcomeCard">
          <div className="welcomeText">
            <h2>Welcome to Lenzie Bowling Club</h2>

            <p>
              Welcome to our new club app. Use the menu above to access
              diary events, notices, competitions, member information and
              important documents.
            </p>
          </div>

          <div className="bowlsGraphic">🏆</div>
        </div>

        <div className="statsGrid">
          <div className="statCard blue">
            <h3>Upcoming Events</h3>
            <div className="bigNumber">3</div>
            <p>Next event: Club Trip</p>
            <p>Sat, 24 May 2026</p>
          </div>

          <div className="statCard green">
            <h3>Unread Notices</h3>
            <div className="bigNumber">2</div>
            <p>Latest: Green Maintenance</p>
            <p>10 May 2026</p>
          </div>

          <div className="statCard purple">
            <h3>Total Members</h3>
            <div className="bigNumber">42</div>
            <p>Active members</p>
            <p>2025 / 2026</p>
          </div>
        </div>

        <div className="sectionBox">
          <h2>{activeTab}</h2>

          <div className="uploadBox">
            <label className="uploadBtn">
              Add File
              <input
                type="file"
                hidden
                onChange={(e) =>
                  addFile(activeTab, e.target.files[0])
                }
              />
            </label>
          </div>

          {(files[activeTab] || []).map((file, index) => (
            <div key={index} className="fileItem">
              <a href={file.url} target="_blank">
                {file.name}
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        © 2026 Lenzie Bowling Club. All rights reserved.
      </footer>
    </div>
  );
}
