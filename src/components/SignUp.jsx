import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    name === "username" ? setUsername(value) : setPassword(value);
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
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
      console.log(responseData.message);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("Error while singingup:", err);
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSignup}>
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
        <button className="button signup-button" type="submit">
          SignUp
        </button>
        {error && error.length > 0 && <p>{error}</p>}
      </form>
      <div className="form-last">
        <p>Already have an account?</p>
        <button
          className="button form-last-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
