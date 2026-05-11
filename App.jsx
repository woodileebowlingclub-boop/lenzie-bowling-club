import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {
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
  ];

  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const [sectionText, setSectionText] = useState({
    Home: "Welcome to Lenzie Bowling Club.",
    Diary: "Upcoming events will appear here.",
    Notices: "Latest club notices appear here.",
    Competitions: "Competition information will appear here.",
    Members: "Members information will appear here.",
    "Office Bearers": "Club officials will appear here.",
    "Club Coaches": "Coaching information will appear here.",
    Documents: "Club documents will appear here.",
  });

  function login() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
      setIsAdmin(true);
      setActiveTab("Home");
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
    setActiveTab("Home");
  }

  function updateSection(value) {
    setSectionText({
      ...sectionText,
      [activeTab]: value,
    });
  }

  if (!loggedIn) {
    return (
      <div className="loginPage">
        <div className="loginBox">
          <img src={logo} alt="Lenzie Bowling Club" className="loginLogo" />

          <h1>Lenzie Bowling Club</h1>
          <p className="subtitle">Members App</p>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="headerLeft">
          <img src={logo} alt="logo" className="headerLogo" />

          <div>
            <h1>Lenzie Bowling Club</h1>
            <p>{isAdmin ? "Administrator Mode" : "Members App"}</p>
          </div>
        </div>

        <button className="logoutBtn" onClick={logout}>
          Log Out
        </button>
      </header>

      <nav className="navBar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "navButton active" : "navButton"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="mainContent">
        <div className="card">
          <h2>{activeTab}</h2>

          {isAdmin ? (
            <>
              <textarea
                value={sectionText[activeTab]}
                onChange={(e) => updateSection(e.target.value)}
              />

              <button
                style={{ marginTop: "15px" }}
                onClick={() => alert(`${activeTab} updated`)}
              >
                Save {activeTab}
              </button>
            </>
          ) : (
            <p>{sectionText[activeTab]}</p>
          )}
        </div>
      </main>
    </div>
  );
}
