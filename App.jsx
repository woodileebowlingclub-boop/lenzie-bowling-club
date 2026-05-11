import "./App.css";
import logo from "./assets/lenzie_logo_small.png";
import { useState } from "react";

export default function App() {

  const ADMIN_PIN = "1234";
  const MEMBER_PIN = "2026";

  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [activeTab, setActiveTab] = useState("Home");

  const [homeText, setHomeText] = useState(
    "Welcome to Lenzie Bowling Club."
  );

  const [noticeText, setNoticeText] = useState(
    "Latest club notices appear here."
  );

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

  function login() {

    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
      setIsAdmin(true);
      setPin("");
    }

    else if (pin === MEMBER_PIN) {
      setLoggedIn(true);
      setIsAdmin(false);
      setPin("");
    }

    else {
      alert("Incorrect PIN");
    }
  }

  function logout() {
    setLoggedIn(false);
    setIsAdmin(false);
    setPin("");
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

          <p className="subtitle">
            Members App
          </p>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <button onClick={login}>
            Login
          </button>

        </div>

      </div>
    );
  }

  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="headerLeft">

          <img
            src={logo}
            alt="logo"
            className="headerLogo"
          />

          <div>

            <h1>Lenzie Bowling Club</h1>

            <p>
              {isAdmin
                ? "Administrator Mode"
                : "Members App"}
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

      {/* NAVIGATION */}

      <nav className="navBar">

        {tabs.map((tab) => (

          <button
            key={tab}
            className={
              activeTab === tab
                ? "navButton active"
                : "navButton"
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>

        ))}

      </nav>

      {/* CONTENT */}

      <main className="mainContent">

        {/* HOME */}

        {activeTab === "Home" && (

          <div className="card">

            <h2>Welcome</h2>

            {isAdmin ? (

              <>

                <textarea
                  value={homeText}
                  onChange={(e) =>
                    setHomeText(e.target.value)
                  }
                />

                <button
                  style={{ marginTop: "15px" }}
                  onClick={() =>
                    alert("Home page updated")
                  }
                >
                  Save Changes
                </button>

              </>

            ) : (

              <p>{homeText}</p>

            )}

          </div>
        )}

        {/* DIARY */}

        {activeTab === "Diary" && (

          <div className="card">

            <h2>Diary</h2>

            <p>
              Upcoming events will appear here.
            </p>

          </div>
        )}

        {/* NOTICES */}

        {activeTab === "Notices" && (

          <div className="card">

            <h2>Club Notices</h2>

            {isAdmin ? (

              <>

                <textarea
                  value={noticeText}
                  onChange={(e) =>
                    setNoticeText(e.target.value)
                  }
                />

                <button
                  style={{ marginTop: "15px" }}
                  onClick={() =>
                    alert("Notice updated")
                  }
                >
                  Save Notice
                </button>

              </>

            ) : (

              <p>{noticeText}</p>

            )}

          </div>
        )}

        {/* COMPETITIONS */}

        {activeTab === "Competitions" && (

          <div className="card">

            <h2>Competitions</h2>

            <p>
              Competition information here.
            </p>

          </div>
        )}

        {/* MEMBERS */}

        {activeTab === "Members" && (

          <div className="card">

            <h2>Members</h2>

            <p>
              Members section.
            </p>

          </div>
        )}

        {/* OFFICE BEARERS */}

        {activeTab === "Office Bearers" && (

          <div className="card">

            <h2>Office Bearers</h2>

            <p>
              Club officials listed here.
            </p>

          </div>
        )}

        {/* COACHES */}

        {activeTab === "Club Coaches" && (

          <div className="card">

            <h2>Club Coaches</h2>

            <p>
              Coaching information here.
            </p>

          </div>
        )}

        {/* DOCUMENTS */}

        {activeTab === "Documents" && (

          <div className="card">

            <h2>Documents</h2>

            <p>
              Club documents available here.
            </p>

          </div>
        )}

      </main>

    </div>
  );
}
