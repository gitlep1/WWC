import "./DesktopApp.scss";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { scaleRotate as SidebarMenu } from "react-burger-menu";

// Page stuff \\
import Homepage from "./Homepage/Homepage";
import LeaderBoard from "./Leaderboard/LeaderBoard";
import Shop from "./Shop/Shop";

// Nav stuff \\
import NavBar from "./NavBar/NavBar";
import Sidebar from "./Sidebar/Sidebar";
import FoF from "./FourOFour/FoF";

// Account stuff \\
import AccountPage from "./Accounts/AccountPage/AccountPage";
import AccountSettings from "./Accounts/AccountSettings/AccountSettings";
import Inventory from "./Accounts/Inventory/Inventory";
import Signin from "./Accounts/Signin/Signin";
import Signup from "./Accounts/Signup/Signup";
import Signout from "./Accounts/Signout/Signout";

// Game stuff \\
import Lobby from "./Games/Lobby/Lobby";
import GameSettings from "./Games/GameSettings/GameSettings";
import GamePage from "./Games/GamePage/GamePage";

const DesktopApp = ({
  handleSidebarOpen,
  user,
  gameMode,
  setGameMode,
  authenticated,
  token,
  isOpen,
  openInventory,
  handleOpenInventory,
  handleUser,
  handleLogout,
  resize,
  socket,
  loading,
}) => {
  const screenVersion = "desktop";
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignout, setShowSignout] = useState(false);
  const [game, setGame] = useState({});
  const [games, setGames] = useState([]);
  const [player1Data, setPlayer1Data] = useState({});
  const [player2Data, setPlayer2Data] = useState({});

  const handleClose = () => {
    if (showSignUp || showSignIn || showSignout) {
      setShowSignUp(false);
      setShowSignIn(false);
      setShowSignout(false);
    }
  };

  return loading ? (
    <p>loading...</p>
  ) : (
    <section id="desktop-outer-container" className="desktop-main-parent">
      <SidebarMenu
        outerContainerId={"desktop-outer-container"}
        pageWrapId={"desktop-page-wrap"}
        isOpen={isOpen}
        onClose={handleSidebarOpen}
        customBurgerIcon={false}
        right
        width={resize}
        id="desktop-sidebarmenu"
      >
        <Sidebar
          screenVersion={screenVersion}
          user={user}
          authenticated={authenticated}
          token={token}
          handleSidebarOpen={handleSidebarOpen}
          handleOpenInventory={handleOpenInventory}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          setShowSignout={setShowSignout}
        />
      </SidebarMenu>

      <NavBar
        screenVersion={screenVersion}
        handleOpen={handleSidebarOpen}
        authenticated={authenticated}
      />

      <main id="desktop-page-wrap">
        <Routes>
          <Route path="/">
            {/* Account Routes */}
            <Route
              path="/"
              index
              element={
                <Homepage
                  screenVersion={screenVersion}
                  user={user}
                  authenticated={authenticated}
                  token={token}
                />
              }
            />
            <Route
              path="Accounts/:userID"
              element={
                <AccountPage
                  screenVersion={screenVersion}
                  user={user}
                  authenticated={authenticated}
                  token={token}
                />
              }
            />
            <Route
              path="Accounts/:userID/Settings"
              element={
                <AccountSettings
                  screenVersion={screenVersion}
                  user={user}
                  authenticated={authenticated}
                  token={token}
                  handleUser={handleUser}
                  handleLogout={handleLogout}
                />
              }
            />
            {/* Game Routes */}
            <Route
              path="Lobby"
              element={
                <Lobby
                  screenVersion={screenVersion}
                  user={user}
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                  authenticated={authenticated}
                  token={token}
                  socket={socket}
                />
              }
            />
            <Route
              path="Room/:gameID/Settings"
              element={
                <GameSettings
                  screenVersion={screenVersion}
                  user={user}
                  authenticated={authenticated}
                  token={token}
                  socket={socket}
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                  game={game}
                  setGame={setGame}
                  setPlayer1Data={setPlayer1Data}
                  setPlayer2Data={setPlayer2Data}
                />
              }
            />
            <Route
              path="Room/:gameID"
              element={
                <GamePage
                  screenVersion={screenVersion}
                  user={user}
                  authenticated={authenticated}
                  token={token}
                  socket={socket}
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                  game={game}
                  setGame={setGame}
                  player1Data={player1Data}
                  player2Data={player2Data}
                  setPlayer1Data={setPlayer1Data}
                  setPlayer2Data={setPlayer2Data}
                />
              }
            />
            {/* LeaderBoard Route */}
            <Route
              path="Leaderboard"
              element={
                <LeaderBoard
                  screenVersion={screenVersion}
                  user={user}
                  authenticated={authenticated}
                  token={token}
                  socket={socket}
                />
              }
            />
            {/* Shop Route */}
            <Route
              path="Shop"
              element={
                <Shop
                  screenVersion={screenVersion}
                  authenticated={authenticated}
                  token={token}
                />
              }
            />
            {/* FoF Route */}
            <Route
              path="*"
              element={<FoF screenVersion={screenVersion} user={user} />}
            />
          </Route>
        </Routes>
      </main>

      {openInventory ? (
        <Inventory
          screenVersion={screenVersion}
          openInventory={openInventory}
          handleOpenInventory={handleOpenInventory}
          user={user}
          authenticated={authenticated}
          token={token}
        />
      ) : null}

      {showSignIn ? (
        <Signin
          screenVersion={screenVersion}
          handleUser={handleUser}
          showSignIn={showSignIn}
          handleClose={handleClose}
        />
      ) : null}

      {showSignUp ? (
        <Signup
          screenVersion={screenVersion}
          handleUser={handleUser}
          showSignUp={showSignUp}
          handleClose={handleClose}
        />
      ) : null}

      {showSignout ? (
        <Signout
          screenVersion={screenVersion}
          handleLogout={handleLogout}
          showSignout={showSignout}
          handleClose={handleClose}
        />
      ) : null}
    </section>
  );
};

export default DesktopApp;
