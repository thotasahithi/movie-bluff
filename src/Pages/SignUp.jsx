import React, { useState } from "react";
import useAuth from "/Users/pranaysinguluri/movie-bluff/src/Hooks/UseAuth.jsx";
import NavBar from "Components/NavBar";
import {Link} from "react-router-dom"


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <NavBar/>
      <form className="signup-container" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
        <input 
        id="userEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p>
          Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </p>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignUp;
