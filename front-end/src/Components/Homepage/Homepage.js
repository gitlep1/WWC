import "./Homepage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import DailyTasks from "./HomepageTasks/DailyTasks";
import MonthlyTasks from "./HomepageTasks/MonthlyTasks";

import HomepageFacts from "./HomepageFacts/HomepageFacts";

const Homepage = ({ screenVersion, user, token }) => {
  const navigate = useNavigate();

  const [dailyTaskSelected, setDailyTaskSelected] = useState(true);

  const handleSelectedTaskButton = (taskSelected) => {
    if (taskSelected === "daily") {
      setDailyTaskSelected(true);
    } else if (taskSelected === "monthly") {
      setDailyTaskSelected(false);
    }
  };

  return (
    <section className={`${screenVersion}-homepage-container`}>
      <section className="homepage-main-section">
        <div className="homepage-section-one">
          <div className="homepage-welcome-user">
            <h3>
              Welcome <br /> {user.username}
            </h3>
            <div className="play-button-container">
              <Button
                className="play-button"
                variant="outline-warning"
                onClick={() => {
                  navigate("./Lobby");
                }}
              >
                Play Chess
              </Button>
            </div>
          </div>

          <div className="homepage-previous-matches"></div>

          {/* add color identifiers later (red = urgent, yellow = warning, green = good) use small boxes with the corresponding background color */}
          <div className="homepage-news">
            <span>
              <h1>News</h1>
            </span>
            <p>
              <span className="news-title">Site Status Update</span>: The site
              is currently in offline mode as I transition to a different
              backend hosting site. My previous host, Adaptable.io, recently
              discontinued its free tier, impacting the site's real-time
              functionality powered by Socket.io.
              <br />
              <br />
              <span className="news-note">Features affected by this</span>:
              <br />
              Multiplayer
              <br />
              chat system
              <br />
              Tasks (can only be completed in multiplayer)
              <br />
              <br />
              To ensure a better and more sustainable user experience, I'm
              migrating to AWS for backend hosting.
              <br />
              This upgrade involves me learning and integrating new
              technologies, so the process will take time.
              <br />
              <br />
              Thank you for your patience and support as I work to bring
              everything back online!
            </p>
          </div>
        </div>

        <div className="homepage-section-two">
          <h3>Tasks</h3>
          <div className="homepage-section-two-tasks">
            <div className="tasks-container">
              <div className="task-button-container">
                <h4
                  className={`task-button ${
                    dailyTaskSelected ? "task-selected" : null
                  }`}
                  onClick={() => {
                    handleSelectedTaskButton("daily");
                  }}
                >
                  Daily
                </h4>
                <h4
                  className={`task-button ${
                    dailyTaskSelected ? null : "task-selected"
                  }`}
                  onClick={() => {
                    handleSelectedTaskButton("monthly");
                  }}
                >
                  Monthly
                </h4>
              </div>
              <div className="tasks-content">
                {user.is_guest ? (
                  <p style={{ color: "red" }}>
                    {/* Please create an account to participate in daily and monhtly
                    tasks for rewards. */}
                    Offline
                  </p>
                ) : dailyTaskSelected ? (
                  // <DailyTasks user={user} token={token} />
                  <div>
                    <p style={{ color: "red" }}>Offline</p>
                  </div>
                ) : (
                  // <MonthlyTasks user={user} token={token} />

                  <p style={{ color: "red" }}>Offline</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="homepage-footer-container">
        <HomepageFacts />
        <div className="homepage-filler-space"></div>
        <h4 className="homepage-footer-title">
          World Wide Chess <br />
          &copy; 2022
        </h4>
      </footer>
    </section>
  );
};

export default Homepage;
