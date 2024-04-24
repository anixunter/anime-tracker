import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setAnimesOfUser, setUserId, setUserData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    name === "username" ? setUsername(value) : setPassword(value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
        setLoading(false);
        return;
      }
      setUserId(responseData.user_id);
      setUserData(username);
      setIsLoggedIn(true);
      //to store the user animes
      setAnimesOfUser(responseData.userAnimes);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Error while logging:", err);
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="button login-button" type="submit">
          Login
        </button>
        {error && error.length > 0 && <p>{error}</p>}
      </form>
      <div className="form-last">
        <p>Don't have an account?</p>
        <button
          className="button form-last-button"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Login;
