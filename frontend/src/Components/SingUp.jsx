import { useState } from "react";

const SingUp = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [gender, setGender] = useState("");
  let [subject, setSubject] = useState("");
  let [email, setEmail] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      username: username,
      password: password,
      gender: gender,
      email: email,
      subject: subject
    };

    console.log(userData);

    setPassword("");
    setUsername("");
    setGender("");
    setSubject("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <fieldset>
        <legend>Gender</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
      </fieldset>

      <label>Select the Subject:</label>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">Select The Option</option>
        <option value="HTML">HTML</option>
        <option value="JS">JS</option>
        <option value="CSS">CSS</option>
        <option value="React.js">React.js</option>
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SingUp;

