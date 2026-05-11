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
      {/* HEADER */}
      <header className="topHeader">
        <div className="logoArea">
          <img
            src={logo}
            alt="Lenzie Bowling Club"
            className="clubLogo"
          />

          <div>
            <h1>Lenzie Bowling Club</h1>
            <p>Members App</p>
          </div>
        </div>

        <button className="logoutBtn">
          Log Out
        </button>
      </header>

      {/* MENU */}
      <nav className="menuBar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab
                ? "tab activeTab"
                : "tab"
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main className="contentArea">

        {/* WELCOME SECTION */}
        <div className="welcomeCard">
          <div className="welcomeText">
            <h2>
              Welcome to Lenzie Bowling Club
            </h2>

            <p>
              Welcome to our new members app.
              Use the sections above to access
              fixtures, notices, competitions,
              club documents and member
              information.
            </p>
          </div>

          <div className="bowlsGraphic">
            🏆
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="statsGrid">

          <div className="statCard blue">
            <h3>Upcoming Events</h3>

            <div className="bigNumber">
              3
            </div>

            <p>
              Next Event:
            </p>

            <p>
              Saturday Friendly Match
            </p>
          </div>

          <div className="statCard green">
            <h3>Latest Notices</h3>

            <div className="bigNumber">
              2
            </div>

            <p>
              Green Maintenance
            </p>

            <p>
              Monday 11 May 2026
            </p>
          </div>

          <div className="statCard purple">
            <h3>Total Members</h3>

            <div className="bigNumber">
              42
            </div>

            <p>
              Active Members
            </p>

            <p>
              2026 Season
            </p>
          </div>

        </div>

        {/* ACTIVE SECTION */}
        <div className="sectionBox">

          <h2>
            {activeTab}
          </h2>

          <p>
            This is the {activeTab} section.
          </p>

          {/* FILE UPLOAD */}
          <div className="uploadBox">

            <label className="uploadBtn">
              Add File

              <input
                type="file"
                hidden
                onChange={(e) =>
                  addFile(
                    activeTab,
                    e.target.files[0]
                  )
                }
              />
            </label>

          </div>

          {/* FILE LIST */}
          {(files[activeTab] || []).length === 0 ? (
            <p className="emptyText">
              No files uploaded yet.
            </p>
          ) : (
            (files[activeTab] || []).map(
              (file, index) => (
                <div
                  key={index}
                  className="fileItem"
                >
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 {file.name}
                  </a>
                </div>
              )
            )
          )}

        </div>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Lenzie Bowling Club
      </footer>
    </div>
  );
}
