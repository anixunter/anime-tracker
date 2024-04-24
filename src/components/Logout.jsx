import React from "react";

const Logout = ({ setIsLoggedIn }) => {
  function handleLogout() {
    setIsLoggedIn(false);
  }
  return (
    <div className="logout">
      <button onClick={handleLogout} className="button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
