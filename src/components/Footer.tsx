import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    style={{
      borderTop: "1px solid #222",
      background: "#111",
      color: "white",
      padding: "40px 24px",
      marginTop: "40px",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "30px",
      }}
    >
      {/* Brand */}
      <div>
        <h2 style={{ color: "#ff4d4d", marginBottom: "10px" }}>
          Fata&apos;s Car Kit
        </h2>
        <p style={{ color: "#bbb", lineHeight: "1.7" }}>
          Premium car decoration accessories to make your ride stand out.
        </p>
      </div>

      {/* Links */}
      <div>
        <h3 style={{ marginBottom: "12px" }}>Quick Links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/products" style={linkStyle}>Products</Link>
          <Link to="/cart" style={linkStyle}>Cart</Link>
          <Link to="/orders" style={linkStyle}>My Orders</Link>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 style={{ marginBottom: "12px" }}>Contact</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#bbb" }}>
          <p>support@fatacarkit.com</p>
          <p>+1 (555) 123-4567</p>
          <p>123 Auto Drive, Motor City</p>
        </div>
      </div>

      {/* Social (NO ICONS → NO ERRORS) */}
      <div>
        <h3 style={{ marginBottom: "12px" }}>Follow Us</h3>
        <div style={{ display: "flex", gap: "12px" }}>
          <span style={iconBox}>Facebook</span>
          <span style={iconBox}>Instagram</span>
          <span style={iconBox}>Twitter</span>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <p
      style={{
        marginTop: "30px",
        textAlign: "center",
        color: "#aaa",
      }}
    >
      © 2026 Fata&apos;s Car Kit. All rights reserved.
    </p>
  </footer>
);

const linkStyle: React.CSSProperties = {
  color: "#bbb",
  textDecoration: "none",
};

const iconBox: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 12px",
  borderRadius: "8px",
  background: "#222",
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
};

export default Footer;