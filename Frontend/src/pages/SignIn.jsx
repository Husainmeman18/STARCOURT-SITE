import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import "../styles/Auth.css";
import { AuthContext } from "./AuthContext";
import Navbar from "../components/Navbar";

export const Signin = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // added

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("socialLogin") === "true") {
      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Email: email, Password: password }),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        setUser(data.user);
        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMsg(data.error || "Login failed");
      }
    } catch (err) {
      setErrorMsg(err.message || "Network error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#ffffff", color: "#000" }} />
      <div className="signin-container">
        <h2 className="signin-title">Sign in</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            required
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button type="submit" disabled={loading} className="signin-button">
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
        {successMsg && <p className="success-message">{successMsg}</p>}
        <p className="forgot-password">
          <button
            onClick={() => navigate("/forgot-password")}
            className="link-button"
          >
            Forgot your password?
          </button>
        </p>

        <p className="signup-link">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="link-button">
            Sign up
          </button>
        </p>

        <SocialLogin />
      </div>
    </>
  );
};

const SocialLogin = () => {
  const googleLogin = () => {
    window.open("http://localhost:4000/user/auth/google", "_self");
  };

  const facebookLogin = () => {
    window.open("http://localhost:4000/user/auth/facebook", "_self");
  };

  return (
    <div style={{ marginTop: 20, display: "flex", gap: "10px" }}>
      <button onClick={googleLogin} style={buttonStyle}>
        <i className="fab fa-google" style={iconStyle}></i>
      </button>
      <button onClick={facebookLogin} style={buttonStyle}>
        <i className="fab fa-facebook-f" style={iconStyle}></i>
      </button>
    </div>
  );
};

const buttonStyle = {
  border: "none",
  background: "none",
  cursor: "pointer",
  padding: "5px",
};

const iconStyle = {
  fontSize: "24px",
};
