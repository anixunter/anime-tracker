import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Title from "./components/Title";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animesOfUser, setAnimesOfUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  return (
    <Router basename="/anime-tracker/">
      <Title />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomePage
                animesOfUser={animesOfUser}
                userId={userId}
                userData={userData}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setAnimesOfUser={setAnimesOfUser}
              setUserId={setUserId}
              setUserData={setUserData}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
