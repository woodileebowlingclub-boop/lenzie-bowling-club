import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useEffect, useState } from "react";

const ADMIN_PIN = "1234";
const MEMBER_PIN = "2026";

const sections = [
  "Home",
  "Diary",
  "Notices",
  "Competitions",
  "Members",
  "Office Bearers",
  "Club Coaches",
  "Documents",
];

const emptyForm = {
  title: "",
  date: "",
  time: "",
  place: "",
  details: "",
  fileName: "",
  fileUrl: "",
};

export default function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [form, setForm] = useState(emptyForm);

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("lenzieAppItems");
    return saved
      ? JSON.parse(saved)
      : {
          Home: [
            {
              title: "Welcome to Lenzie Bowling Club",
              date: "",
              time: "",
              place: "Lenzie Bowling Club",
              details: "Welcome to our new members app.",
              fileName: "",
              fileUrl: "",
            },
          ],
          Diary: [],
          Notices: [],
          Competitions: [],
          Members: [],
          "Office Bearers": [],
          "Club Coaches": [],
          Documents: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("lenzieAppItems", JSON.stringify(items));
  }, [items]);

  function login() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
      setIsAdmin(true);
      setPin("");
    } else if (pin === MEMBER_PIN) {
      setLoggedIn(true);
      setIsAdmin(false);
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

  function handleFile(file) {
    if (!file) return;

    setForm({
      ...form,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    });
  }

  function addItem() {
    if (!form.title.trim() && !form.details.trim()) {
      alert("Add a title or details first.");
      return;
    }

    setItems({
      ...items,
      [activeTab]: [...(items[activeTab] || []), form],
    });

    setForm(emptyForm);
  }

  function deleteItem(index) {
    setItems({
      ...items,
      [activeTab]: items[activeTab].filter((_, i) => i !== index),
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
        {sections.map((section) => (
          <button
            key={section}
            className={activeTab === section ? "navButton active" : "navButton"}
            onClick={() => {
              setActiveTab(section);
              setForm(emptyForm);
            }}
          >
            {section}
          </button>
        ))}
      </nav>

      <main className="mainContent">
        <div className="card">
          <h2>{activeTab}</h2>

          {isAdmin && (
            <div className="adminForm">
              <h3>Add to {activeTab}</h3>

              <input
                placeholder="Title / Name"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                placeholder="Date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <input
                placeholder="Time"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />

              <input
                placeholder="Place"
                value={form.place}
                onChange={(e) =>
                  setForm({ ...form, place: e.target.value })
                }
              />

              <textarea
                placeholder="Details"
                value={form.details}
                onChange={(e) =>
                  setForm({ ...form, details: e.target.value })
                }
              />

              <input
                type="file"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {form.fileName && <p>Selected file: {form.fileName}</p>}

              <button onClick={addItem}>Add to {activeTab}</button>
            </div>
          )}

          <div className="itemList">
            {(items[activeTab] || []).length === 0 ? (
              <p>No entries yet.</p>
            ) : (
              items[activeTab].map((item, index) => (
                <div className="itemBox" key={index}>
                  <h3>{item.title}</h3>

                  {item.date && <p><strong>Date:</strong> {item.date}</p>}
                  {item.time && <p><strong>Time:</strong> {item.time}</p>}
                  {item.place && <p><strong>Place:</strong> {item.place}</p>}
                  {item.details && <p>{item.details}</p>}

                  {item.fileUrl && (
                    <p>
                      <a href={item.fileUrl} target="_blank" rel="noreferrer">
                        Open file: {item.fileName}
                      </a>
                    </p>
                  )}

                  {isAdmin && (
                    <button
                      className="deleteBtn"
                      onClick={() => deleteItem(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
