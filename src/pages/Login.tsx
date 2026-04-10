import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      name: "User",
      email,
    });

    alert("Signed in successfully");
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <NavBar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#111",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Welcome Back</h1>
          <p style={{ color: "#aaa", marginBottom: "24px" }}>
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#222",
                  color: "#fff",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#222",
                  color: "#fff",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign In
            </button>
          </form>

          <p style={{ marginTop: "18px", textAlign: "center", color: "#aaa" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#ff4d4d", textDecoration: "none" }}>
              Register
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;