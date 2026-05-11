import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {
  const ADMIN_PIN = "1873";
  const MEMBER_PIN = "2026";

  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const [members, setMembers] = useState([]);
  const [officeBearers, setOfficeBearers] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const [memberForm, setMemberForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
  });

  const [officeForm, setOfficeForm] = useState({
    name: "",
    role: "",
    phone: "",
    whatsapp: "",
    email: "",
  });

  const [coachForm, setCoachForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
  });

  function login() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
      setAdminMode(true);
    } else if (pin === MEMBER_PIN) {
      setLoggedIn(true);
      setAdminMode(false);
    } else {
      alert("Incorrect PIN");
    }
  }

  function logout() {
    setLoggedIn(false);
    setAdminMode(false);
    setPin("");
  }

  function addMember() {
    if (!memberForm.name) return;

    setMembers([...members, memberForm]);

    setMemberForm({
      name: "",
      phone: "",
      whatsapp: "",
      email: "",
    });
  }

  function addOfficeBearer() {
    if (!officeForm.name) return;

    setOfficeBearers([...officeBearers, officeForm]);

    setOfficeForm({
      name: "",
      role: "",
      phone: "",
      whatsapp: "",
      email: "",
    });
  }

  function addCoach() {
    if (!coachForm.name) return;

    setCoaches([...coaches, coachForm]);

    setCoachForm({
      name: "",
      phone: "",
      whatsapp: "",
      email: "",
    });
  }

  if (!loggedIn) {
    return (
      <div className="loginPage">
        <div className="loginBox">
          <img src={logo} alt="Logo" className="loginLogo" />

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

      {/* HEADER */}

      <div className="header">
        <div className="headerLeft">

          <img
            src={logo}
            alt="Logo"
            className="headerLogo"
          />

          <div>
            <h1>Lenzie Bowling Club</h1>

            <p>
              {adminMode
                ? "Administrator Mode"
                : "Members Area"}
            </p>
          </div>
        </div>

        <button
          className="logoutBtn"
          onClick={logout}
        >
          Log Out
        </button>
      </div>

      {/* NAVIGATION */}

      <div className="navBar">

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
            className={`navButton ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* MAIN */}

      <div className="mainContent">

        <div className="card">

          {/* HOME */}

          {activeTab === "Home" && (
            <>
              <h2>Welcome</h2>

              <p>
                Welcome to the Lenzie Bowling Club
                Members App.
              </p>
            </>
          )}

          {/* MEMBERS */}

          {activeTab === "Members" && (
            <>
              <h2>Members</h2>

              {adminMode && (
                <div className="adminForm">

                  <h3>Add Member</h3>

                  <input
                    placeholder="Name"
                    value={memberForm.name}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Phone Number"
                    value={memberForm.phone}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        phone: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="WhatsApp Number"
                    value={memberForm.whatsapp}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        whatsapp: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Email Address"
                    value={memberForm.email}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        email: e.target.value,
                      })
                    }
                  />

                  <button onClick={addMember}>
                    Add Member
                  </button>

                </div>
              )}

              {members.map((member, index) => (
                <div className="itemBox" key={index}>

                  <h3>{member.name}</h3>

                  <p>📞 {member.phone}</p>

                  <p>💬 {member.whatsapp}</p>

                  <p>✉️ {member.email}</p>

                  <div className="contactButtons">

                    <a
                      href={`tel:${member.phone}`}
                      className="contactBtn"
                    >
                      Call
                    </a>

                    <a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="contactBtn"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="contactBtn"
                    >
                      Email
                    </a>

                  </div>

                </div>
              ))}
            </>
          )}

          {/* OFFICE BEARERS */}

          {activeTab === "Office Bearers" && (
            <>
              <h2>Office Bearers</h2>

              {adminMode && (
                <div className="adminForm">

                  <h3>Add Office Bearer</h3>

                  <input
                    placeholder="Name"
                    value={officeForm.name}
                    onChange={(e) =>
                      setOfficeForm({
                        ...officeForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Role"
                    value={officeForm.role}
                    onChange={(e) =>
                      setOfficeForm({
                        ...officeForm,
                        role: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Phone Number"
                    value={officeForm.phone}
                    onChange={(e) =>
                      setOfficeForm({
                        ...officeForm,
                        phone: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="WhatsApp Number"
                    value={officeForm.whatsapp}
                    onChange={(e) =>
                      setOfficeForm({
                        ...officeForm,
                        whatsapp: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Email Address"
                    value={officeForm.email}
                    onChange={(e) =>
                      setOfficeForm({
                        ...officeForm,
                        email: e.target.value,
                      })
                    }
                  />

                  <button onClick={addOfficeBearer}>
                    Add Office Bearer
                  </button>

                </div>
              )}

              {officeBearers.map((person, index) => (
                <div className="itemBox" key={index}>

                  <h3>{person.name}</h3>

                  <p>{person.role}</p>

                  <p>📞 {person.phone}</p>

                  <p>💬 {person.whatsapp}</p>

                  <p>✉️ {person.email}</p>

                  <div className="contactButtons">

                    <a
                      href={`tel:${person.phone}`}
                      className="contactBtn"
                    >
                      Call
                    </a>

                    <a
                      href={`https://wa.me/${person.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="contactBtn"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${person.email}`}
                      className="contactBtn"
                    >
                      Email
                    </a>

                  </div>

                </div>
              ))}
            </>
          )}

          {/* CLUB COACHES */}

          {activeTab === "Club Coaches" && (
            <>
              <h2>Club Coaches</h2>

              {adminMode && (
                <div className="adminForm">

                  <h3>Add Coach</h3>

                  <input
                    placeholder="Name"
                    value={coachForm.name}
                    onChange={(e) =>
                      setCoachForm({
                        ...coachForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Phone Number"
                    value={coachForm.phone}
                    onChange={(e) =>
                      setCoachForm({
                        ...coachForm,
                        phone: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="WhatsApp Number"
                    value={coachForm.whatsapp}
                    onChange={(e) =>
                      setCoachForm({
                        ...coachForm,
                        whatsapp: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Email Address"
                    value={coachForm.email}
                    onChange={(e) =>
                      setCoachForm({
                        ...coachForm,
                        email: e.target.value,
                      })
                    }
                  />

                  <button onClick={addCoach}>
                    Add Coach
                  </button>

                </div>
              )}

              {coaches.map((coach, index) => (
                <div className="itemBox" key={index}>

                  <h3>{coach.name}</h3>

                  <p>📞 {coach.phone}</p>

                  <p>💬 {coach.whatsapp}</p>

                  <p>✉️ {coach.email}</p>

                  <div className="contactButtons">

                    <a
                      href={`tel:${coach.phone}`}
                      className="contactBtn"
                    >
                      Call
                    </a>

                    <a
                      href={`https://wa.me/${coach.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="contactBtn"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${coach.email}`}
                      className="contactBtn"
                    >
                      Email
                    </a>

                  </div>

                </div>
              ))}
            </>
          )}

          {/* OTHER SECTIONS */}

          {[
            "Diary",
            "Notices",
            "Competitions",
            "Documents",
          ].includes(activeTab) && (
            <>
              <h2>{activeTab}</h2>

              <div className="itemBox">
                <p>
                  {activeTab} information will appear
                  here.
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
