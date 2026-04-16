import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { cartItems = [] } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      style={{
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#000",
        color: "#fff",
        borderBottom: "1px solid #222",
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "24px", fontWeight: "bold" }}>
        Fata&apos;s Car Kit
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>
          Products
        </Link>
        <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
          Cart ({cartCount})
        </Link>

        {user ? (
          <>
            <span>{user.name}</span>
            <button
              onClick={logout}
              style={{
                background: "#ff5757",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;