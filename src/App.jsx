import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {
  const ADMIN_PIN = "1234";

  const [isAdmin, setIsAdmin] = useState(false);
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
      setIsAdmin(true);
      setPin("");
    } else {
      alert("Wrong PIN");
    }
  }

  return (
    <div className="app">
      <header className="club-header">
        <img src={logo} alt="Lenzie Bowling Club" className="club-logo" />

        <h1>Lenzie Bowling Club</h1>
        <p>Members diary, notices, competitions and club information</p>
      </header>

      <section className="admin-box">
        {!isAdmin ? (
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button type="submit">Admin Login</button>
          </form>
        ) : (
          <button onClick={() => setIsAdmin(false)}>Logout Admin</button>
        )}
      </section>

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
          <>
            <p>Club diary events will appear here.</p>
            {isAdmin && <SectionForm section="Diary Event" />}
          </>
        )}

        {activeTab === "Notices" && (
          <>
            <p>Club notices will appear here.</p>
            {isAdmin && <SectionForm section="Notice" />}
          </>
        )}

        {activeTab === "Competitions" && (
          <>
            <p>Competition information will appear here.</p>
            {isAdmin && <SectionForm section="Competition" />}
          </>
        )}

        {activeTab === "Members" && (
          <>
            <p>Member contact details will appear here.</p>
            {isAdmin && <ContactForm section="Member" />}
          </>
        )}

        {activeTab === "Office Bearers" && (
          <>
            <p>Office Bearer details will appear here.</p>
            {isAdmin && <ContactForm section="Office Bearer" />}
          </>
        )}

        {activeTab === "Club Coaches" && (
          <>
            <p>Club Coach details will appear here.</p>
            {isAdmin && <ContactForm section="Club Coach" />}
          </>
        )}

        {activeTab === "Documents" && (
          <>
            <p>Club documents will appear here.</p>
            {isAdmin && <DocumentForm />}
          </>
        )}
      </main>
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
