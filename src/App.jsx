import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useEffect, useState } from "react";

const ADMIN_PIN = "1873";

const emptyData = {
  diary: [],
  notices: [],
  competitions: [],
  members: [],
  officeBearers: [],
  coaches: [],
  documents: [],
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [data, setData] = useState(emptyData);

  useEffect(() => {
    const saved = localStorage.getItem("lenzieClubData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lenzieClubData", JSON.stringify(data));
  }, [data]);

  function login(e) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      setPin("");
    } else {
      alert("Wrong PIN");
    }
  }

  function addItem(section, item) {
    const newItem = { id: Date.now(), ...item };
    setData({ ...data, [section]: [...data[section], newItem] });
  }

  function deleteItem(section, id) {
    setData({
      ...data,
      [section]: data[section].filter((item) => item.id !== id),
    });
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
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Admin PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button>Admin Login</button>
          </form>
        ) : (
          <button onClick={() => setIsAdmin(false)}>Logout Admin</button>
        )}
      </section>

      <nav className="tabs">
        {[
          "Home",
          "Diary",
          "Notices",
          "Competitions",
          "Members",
          "Office Bearers",
          "Club Coaches",
          "Documents",
        ].map((tab) => (
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
        {activeTab === "Home" && (
          <>
            <h2>Welcome</h2>
            <p>Welcome to the Lenzie Bowling Club members app.</p>
          </>
        )}

        {activeTab === "Diary" && (
          <Section
            title="Diary"
            section="diary"
            items={data.diary}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}

        {activeTab === "Notices" && (
          <Section
            title="Notices"
            section="notices"
            items={data.notices}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}

        {activeTab === "Competitions" && (
          <Section
            title="Competitions"
            section="competitions"
            items={data.competitions}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}

        {activeTab === "Members" && (
          <Contacts
            title="Members"
            section="members"
            items={data.members}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}

        {activeTab === "Office Bearers" && (
          <Contacts
            title="Office Bearers"
            section="officeBearers"
            items={data.officeBearers}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}

        {activeTab === "Club Coaches" && (
          <Contacts
            title="Club Coaches"
            section="coaches"
            items={data.coaches}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}

        {activeTab === "Documents" && (
          <Documents
            items={data.documents}
            isAdmin={isAdmin}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        )}
      </main>
    </div>
  );
}

function Section({ title, section, items, isAdmin, addItem, deleteItem }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    place: "",
    notes: "",
  });

  function submit(e) {
    e.preventDefault();
    addItem(section, form);
    setForm({ title: "", date: "", time: "", place: "", notes: "" });
  }

  return (
    <>
      <h2>{title}</h2>

      {isAdmin && (
        <form className="form-box" onSubmit={submit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <input
            placeholder="Place"
            value={form.place}
            onChange={(e) => setForm({ ...form, place: e.target.value })}
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <button>Add</button>
        </form>
      )}

      {items.length === 0 && <p>No items added yet.</p>}

      {items.map((item) => (
        <div className="item-card" key={item.id}>
          <h3>{item.title}</h3>
          {item.date && <p><strong>Date:</strong> {item.date}</p>}
          {item.time && <p><strong>Time:</strong> {item.time}</p>}
          {item.place && <p><strong>Place:</strong> {item.place}</p>}
          {item.notes && <p>{item.notes}</p>}
          {isAdmin && (
            <button onClick={() => deleteItem(section, item.id)}>Delete</button>
          )}
        </div>
      ))}
    </>
  );
}

function Contacts({ title, section, items, isAdmin, addItem, deleteItem }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    whatsapp: "",
    email: "",
  });

  function submit(e) {
    e.preventDefault();
    addItem(section, form);
    setForm({ name: "", role: "", phone: "", whatsapp: "", email: "" });
  }

  function whatsappLink(number) {
    let cleaned = number.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "44" + cleaned.slice(1);
    return `https://wa.me/${cleaned}`;
  }

  return (
    <>
      <h2>{title}</h2>

      {isAdmin && (
        <form className="form-box" onSubmit={submit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Role / details"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="WhatsApp number"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
          <input
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button>Add</button>
        </form>
      )}

      {items.length === 0 && <p>No contacts added yet.</p>}

      {items.map((item) => (
        <div className="item-card" key={item.id}>
          <h3>{item.name}</h3>
          {item.role && <p>{item.role}</p>}
          {item.phone && <p><a href={`tel:${item.phone}`}>Call</a></p>}
          {item.whatsapp && <p><a href={whatsappLink(item.whatsapp)} target="_blank">WhatsApp</a></p>}
          {item.email && <p><a href={`mailto:${item.email}`}>Email</a></p>}
          {isAdmin && (
            <button onClick={() => deleteItem(section, item.id)}>Delete</button>
          )}
        </div>
      ))}
    </>
  );
}

function Documents({ items, isAdmin, addItem, deleteItem }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    link: "",
  });

  function submit(e) {
    e.preventDefault();
    addItem("documents", form);
    setForm({ title: "", category: "", link: "" });
  }

  return (
    <>
      <h2>Documents</h2>

      {isAdmin && (
        <form className="form-box" onSubmit={submit}>
          <input
            placeholder="Document title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            placeholder="Document link / URL"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
          <button>Add Document</button>
        </form>
      )}

      {items.length === 0 && <p>No documents added yet.</p>}

      {items.map((item) => (
        <div className="item-card" key={item.id}>
          <h3>{item.title}</h3>
          {item.category && <p><strong>Category:</strong> {item.category}</p>}
          {item.link && (
            <p>
              <a href={item.link} target="_blank">Open Document</a>
            </p>
          )}
          {isAdmin && (
            <button onClick={() => deleteItem("documents", item.id)}>
              Delete
            </button>
          )}
        </div>
      ))}
    </>
  );
}
