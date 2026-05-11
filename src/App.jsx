import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {
  const ADMIN_PIN = "1234";

  const [loggedIn, setLoggedIn] = useState(false);
  const [pin, setPin] = useState("");
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
  ];

  function handleLogin(e) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
    } else {
      alert("Wrong PIN");
    }
  }

  return (
    <div className="app">
      <header className="club-header">
        <div className="logo-wrap">
          <img src={logo} alt="Lenzie Bowling Club" className="club-logo" />
        </div>

        <div>
          <h1>Lenzie Bowling Club</h1>
          <p>Members diary, notices, competitions and club information</p>
        </div>
      </header>

      {!loggedIn && (
        <section className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </section>
      )}

      {loggedIn && (
        <>
          <nav className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "active" : ""}
              >
                {tab}
              </button>
            ))}
          </nav>

          <main className="content-card">
            <h2>{activeTab}</h2>

            {activeTab === "Home" && (
              <p>Welcome to the Lenzie Bowling Club members app.</p>
            )}

            {activeTab === "Diary" && (
              <SectionForm section="Diary" />
            )}

            {activeTab === "Notices" && (
              <SectionForm section="Notice" />
            )}

            {activeTab === "Competitions" && (
              <SectionForm section="Competition" />
            )}

            {activeTab === "Members" && (
              <ContactForm section="Member" />
            )}

            {activeTab === "Office Bearers" && (
              <ContactForm section="Office Bearer" />
            )}

            {activeTab === "Club Coaches" && (
              <ContactForm section="Club Coach" />
            )}

            {activeTab === "Documents" && (
              <DocumentForm />
            )}
          </main>
        </>
      )}
    </div>
  );
}

function SectionForm({ section }) {
  return (
    <div className="form-box">
      <input placeholder={`${section} title`} />
      <input type="date" />
      <input type="time" />
      <input placeholder="Place / venue" />
      <textarea placeholder="Notes / details"></textarea>
      <input type="file" />
      <button>Add {section}</button>
    </div>
  );
}

function ContactForm({ section }) {
  return (
    <div className="form-box">
      <input placeholder={`${section} name`} />
      <input placeholder="Phone number" />
      <input placeholder="WhatsApp number" />
      <input placeholder="Email address" />
      <textarea placeholder="Notes / role / details"></textarea>
      <button>Add {section}</button>
    </div>
  );
}

function DocumentForm() {
  return (
    <div className="form-box">
      <input placeholder="Document title" />
      <input placeholder="Category" />
      <input type="file" />
      <button>Add Document</button>
    </div>
  );
}
