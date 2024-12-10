import React, { useState } from "react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:2000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="columns mt-5 is-centered">
      <form onSubmit={handleSubmit}>
        <div class="field">
          <h2 class="title is-2 has-text-centered">Register</h2>
          <div class="field">
            <label class="label">Full Name</label>
            <div class="control">
              <input
                class="input"
                type="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
          </div>
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <button class="button is-primary">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
