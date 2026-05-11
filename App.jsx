import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");
  const [activeTab, setActiveTab] = useState("Home");

  const ADMIN_PIN = "1234";
  const MEMBER_PIN = "2026";

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

  function login() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
      setIsAdmin(true);
      setActiveTab("Admin Settings");
      setPin("");
    } else if (pin === MEMBER_PIN) {
      setLoggedIn(true);
      setIsAdmin(false);
      setActiveTab("Home");
      setPin("");
    } else {
      alert("Incorrect PIN");
    }
  }

  function logout() {
    setLoggedIn(false);
    setIsAdmin(false);
    setPin("");
  }

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

  if (!loggedIn) {
    return (
      <div className="loginPage">
        <div className="loginBox">

          <img
            src={logo}
            alt="Lenzie Bowling Club"
            className="loginLogo"
          />

          <h1>Lenzie Bowling Club</h1>

          <p>Members App</p>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <button onClick={login}>
            Login
          </button>

          <div style={{ marginTop: "15px", fontSize: "14px" }}>
            <p>Admin PIN: 1234</p>
            <p>Member PIN: 2026</p>
          </div>

        </div>
      </div>
    );
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
            <p>
              {isAdmin
                ? "Administrator Mode"
                : "Member Mode"}
            </p>
          </div>

        </div>

        <button
          className="logoutBtn"
          onClick={logout}
        >
          Log Out
        </button>

      </header>

      {/* MENU */}
      <nav className="menuBar">

        {tabs
          .filter(
            (tab) =>
              isAdmin ||
              tab !== "Admin Settings"
          )
          .map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab
                  ? "tab activeTab"
                  : "tab"
              }
              onClick={() =>
                setActiveTab(tab)
              }
            >
              {tab}
            </button>
          ))}

      </nav>

      {/* MAIN */}
      <main className="contentArea">

        {/* WELCOME */}
        <div className="welcomeCard">

          <div className="welcomeText">

            <h2>
              Welcome to Lenzie Bowling Club
            </h2>

            <p>
              Access fixtures, notices,
              competitions, documents and
              member information all in one
              place.
            </p>

          </div>

          <div className="bowlsGraphic">
            🏆
          </div>

        </div>

        {/* DASHBOARD */}
        <div className="statsGrid">

          <div className="statCard blue">

            <h3>Upcoming Events</h3>

            <div className="bigNumber">
              3
            </div>

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

          </div>

          <div className="statCard purple">

            <h3>Total Members</h3>

            <div className="bigNumber">
              42
            </div>

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

          {/* ADMIN FILE UPLOAD */}
          {isAdmin && (
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
          )}

          {/* FILES */}
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

          {/* ADMIN SETTINGS */}
          {activeTab === "Admin Settings" &&
            isAdmin && (

            <div className="card">

              <h3>
                Administrator Controls
              </h3>

              <p>
                Upload documents, manage
                sections and update club
                information.
              </p>

            </div>

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
