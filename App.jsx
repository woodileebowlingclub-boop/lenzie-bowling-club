import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {
  const ADMIN_PIN = "1234";
  const MEMBER_PIN = "2026";

  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const [diaryText, setDiaryText] = useState("");
  const [noticeText, setNoticeText] = useState("");

  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberWhatsapp, setMemberWhatsapp] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);

  const [officeName, setOfficeName] = useState("");
  const [officeRole, setOfficeRole] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [officeWhatsapp, setOfficeWhatsapp] = useState("");
  const [officeEmail, setOfficeEmail] = useState("");
  const [officeBearers, setOfficeBearers] = useState([]);

  const [coachName, setCoachName] = useState("");
  const [coachPhone, setCoachPhone] = useState("");
  const [coachWhatsapp, setCoachWhatsapp] = useState("");
  const [coachEmail, setCoachEmail] = useState("");
  const [coaches, setCoaches] = useState([]);

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
    if (!memberName) return;

    const newMember = {
      name: memberName,
      phone: memberPhone,
      whatsapp: memberWhatsapp,
      email: memberEmail,
    };

    setMembers([...members, newMember]);

    setMemberName("");
    setMemberPhone("");
    setMemberWhatsapp("");
    setMemberEmail("");
  }

  function addOfficeBearer() {
    if (!officeName) return;

    const newOfficeBearer = {
      name: officeName,
      role: officeRole,
      phone: officePhone,
      whatsapp: officeWhatsapp,
      email: officeEmail,
    };

    setOfficeBearers([...officeBearers, newOfficeBearer]);

    setOfficeName("");
    setOfficeRole("");
    setOfficePhone("");
    setOfficeWhatsapp("");
    setOfficeEmail("");
  }

  function addCoach() {
    if (!coachName) return;

    const newCoach = {
      name: coachName,
      phone: coachPhone,
      whatsapp: coachWhatsapp,
      email: coachEmail,
    };

    setCoaches([...coaches, newCoach]);

    setCoachName("");
    setCoachPhone("");
    setCoachWhatsapp("");
    setCoachEmail("");
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
      <div className="header">
        <div className="headerLeft">
          <img src={logo} alt="Logo" className="headerLogo" />

          <div>
            <h1>Lenzie Bowling Club</h1>

            <p>
              {adminMode ? "Administrator Mode" : "Members Area"}
            </p>
          </div>
        </div>

        <button className="logoutBtn" onClick={logout}>
          Log Out
        </button>
      </div>

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

      <div className="mainContent">
        <div className="card">

          {activeTab === "Home" && (
            <>
              <h2>Welcome</h2>

              <p>
                Welcome to the Lenzie Bowling Club Members App.
              </p>
            </>
          )}

          {activeTab === "Diary" && (
            <>
              <h2>Diary</h2>

              {adminMode && (
                <div className="adminForm">
                  <textarea
                    placeholder="Add diary event..."
                    value={diaryText}
                    onChange={(e) => setDiaryText(e.target.value)}
                  />
                </div>
              )}

              <div className="itemBox">
                <p>{diaryText || "No diary events added."}</p>
              </div>
            </>
          )}

          {activeTab === "Notices" && (
            <>
              <h2>Notices</h2>

              {adminMode && (
                <div className="adminForm">
                  <textarea
                    placeholder="Add notice..."
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                  />
                </div>
              )}

              <div className="itemBox">
                <p>{noticeText || "No notices added."}</p>
              </div>
            </>
          )}

          {activeTab === "Members" && (
            <>
              <h2>Members</h2>

              {adminMode && (
                <div className="adminForm">
                  <h3>Add Member</h3>

                  <input
                    placeholder="Member name"
                    value={memberName}
                    onChange={(e) =>
                      setMemberName(e.target.value)
                    }
                  />

                  <input
                    placeholder="Phone number"
                    value={memberPhone}
                    onChange={(e) =>
                      setMemberPhone(e.target.value)
                    }
                  />

                  <input
                    placeholder="WhatsApp number"
                    value={memberWhatsapp}
                    onChange={(e) =>
                      setMemberWhatsapp(e.target.value)
                    }
                  />

                  <input
                    placeholder="Email address"
                    value={memberEmail}
                    onChange={(e) =>
                      setMemberEmail(e.target.value)
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

                  <p>Phone: {member.phone}</p>

                  <p>WhatsApp: {member.whatsapp}</p>

                  <p>Email: {member.email}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === "Office Bearers" && (
            <>
              <h2>Office Bearers</h2>

              {adminMode && (
                <div className="adminForm">
                  <h3>Add Office Bearer</h3>

                  <input
                    placeholder="Name"
                    value={officeName}
                    onChange={(e) =>
                      setOfficeName(e.target.value)
                    }
                  />

                  <input
                    placeholder="Role"
                    value={officeRole}
                    onChange={(e) =>
                      setOfficeRole(e.target.value)
                    }
                  />

                  <input
                    placeholder="Phone number"
                    value={officePhone}
                    onChange={(e) =>
                      setOfficePhone(e.target.value)
                    }
                  />

                  <input
                    placeholder="WhatsApp number"
                    value={officeWhatsapp}
                    onChange={(e) =>
                      setOfficeWhatsapp(e.target.value)
                    }
                  />

                  <input
                    placeholder="Email address"
                    value={officeEmail}
                    onChange={(e) =>
                      setOfficeEmail(e.target.value)
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

                  <p>Phone: {person.phone}</p>

                  <p>WhatsApp: {person.whatsapp}</p>

                  <p>Email: {person.email}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === "Club Coaches" && (
            <>
              <h2>Club Coaches</h2>

              {adminMode && (
                <div className="adminForm">
                  <h3>Add Coach</h3>

                  <input
                    placeholder="Coach name"
                    value={coachName}
                    onChange={(e) =>
                      setCoachName(e.target.value)
                    }
                  />

                  <input
                    placeholder="Phone number"
                    value={coachPhone}
                    onChange={(e) =>
                      setCoachPhone(e.target.value)
                    }
                  />

                  <input
                    placeholder="WhatsApp number"
                    value={coachWhatsapp}
                    onChange={(e) =>
                      setCoachWhatsapp(e.target.value)
                    }
                  />

                  <input
                    placeholder="Email address"
                    value={coachEmail}
                    onChange={(e) =>
                      setCoachEmail(e.target.value)
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

                  <p>Phone: {coach.phone}</p>

                  <p>WhatsApp: {coach.whatsapp}</p>

                  <p>Email: {coach.email}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === "Competitions" && (
            <>
              <h2>Competitions</h2>

              <div className="itemBox">
                <p>
                  Competition information will appear here.
                </p>
              </div>
            </>
          )}

          {activeTab === "Documents" && (
            <>
              <h2>Documents</h2>

              <div className="itemBox">
                <p>Club documents will appear here.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
