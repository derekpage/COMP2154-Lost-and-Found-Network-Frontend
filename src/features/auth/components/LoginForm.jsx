import { useState } from "react";


//Colects user info and sends it to parent
export default function LoginForm({ onSubmit, isLoading, error }) {
  //Local state for controlled inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handles the form submit events
  function submit(e) {
    e.preventDefault(); //prevent reload
    onSubmit({ email, password }); //submit
  }

  //Returns the login form
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 360 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {/*Renders an error message only if it exsits*/}
      {error ? <div style={{ color: "crimson" }}>{error}</div> : null}

      {/*Disables the button while login request is in progress*/}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {/*Will be deleted in the future, just reminds the developer what mock accounts are*/}
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        Mock users:
        <div>admin@example.com / admin123</div>
        <div>user@example.com / user123</div>
      </div>
    </form>
  );
}