import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Signup = ({}) => {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:4000/user/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Signup successful! Please signin.");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError(err.message || "Network error");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          name="FirstName"
          placeholder="FirstName"
          value={form.FirstName}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          name="LastName"
          placeholder="LastName"
          value={form.LastName}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading} className="signup-button">
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      {error && <p className="signup-message error-message">{error}</p>}
      {successMsg && (
        <>
          <p className="signup-message success-message">{successMsg}</p>
          <button
            onClick={() => navigate("/signin")}
            className="go-to-signin-button"
          >
            Go to Signin
          </button>
        </>
      )}
    </div>
  );
};
