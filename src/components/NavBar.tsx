import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const NavBar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/orders", label: "My Orders" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #222",
        background: "rgba(17,17,17,0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#ff4d4d",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "28px",
            whiteSpace: "nowrap",
          }}
        >
          Fata&apos;s Car Kit
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
          className="desktop-links"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                color: isActive(l.to) ? "#ff4d4d" : "#ddd",
                textDecoration: "none",
                fontWeight: isActive(l.to) ? "bold" : "normal",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#222",
            borderRadius: "8px",
            padding: "8px 12px",
            minWidth: "240px",
          }}
          className="desktop-search"
        >
          <Search size={18} color="#aaa" />
          <input
            type="text"
            placeholder="Search accessories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginLeft: "8px",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: "100%",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/cart"
            style={{
              color: "#ddd",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "#ff4d4d",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "11px",
                  fontWeight: "bold",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "none",
                color: "#ddd",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ color: "#ddd", textDecoration: "none" }}>
              <User size={22} />
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ddd",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid #222",
            background: "#111",
            padding: "16px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#222",
              borderRadius: "8px",
              padding: "8px 12px",
              marginBottom: "14px",
            }}
          >
            <Search size={18} color="#aaa" />
            <input
              type="text"
              placeholder="Search accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                marginLeft: "8px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                width: "100%",
              }}
            />
          </div>

          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                color: isActive(l.to) ? "#ff4d4d" : "#ddd",
                textDecoration: "none",
                fontWeight: isActive(l.to) ? "bold" : "normal",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;