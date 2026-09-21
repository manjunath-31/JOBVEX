import { useState } from "react";

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    let userData = { username, password };
    console.log(userData);

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="addPform login-form">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
