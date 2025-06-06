import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css"; // Make sure this includes your CSS

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfoMsg("");

    try {
      const res = await fetch("http://localhost:4000/user/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to send OTP");

      setOtpSent(true);
      setInfoMsg("OTP has been sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfoMsg("");

    try {
      const res = await fetch("http://localhost:4000/user/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Username: username,
          OTP,
          Password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "OTP verification failed");

      setInfoMsg("Password has been reset successfully. You can now sign in.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Forgot Password</h2>

      {error && <p className="signup-message error-message">{error}</p>}
      {infoMsg && <p className="signup-message success-message">{infoMsg}</p>}

      {step === 1 && (
        <form className="signup-form" onSubmit={handleSendOTP}>
          <input
            type="email"
            className="signup-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="signup-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="signup-button"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="signup-form" onSubmit={handleResetPassword}>
          <input
            type="text"
            className="signup-input"
            placeholder="OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            required
          />

          <input
            type="password"
            className="signup-input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="signup-button"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="signup-form" style={{ textAlign: "center" }}>
          <p className="signup-message success-message">
            Password reset successful!
          </p>
          <Link to="/signin" className="go-to-signin-button">
            Go to Sign In
          </Link>
        </div>
      )}

      <Link to="/signin" className="go-to-signin-button" style={{ marginTop: "20px" }}>
        Back to Sign In
      </Link>
    </div>
  );
};

export default ForgotPassword;
