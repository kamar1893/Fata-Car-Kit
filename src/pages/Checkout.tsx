import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: totalPrice,
      address: `${form.address}, ${form.city}, ${form.zip}`,
      phone: form.phone,
      customerName: form.name,
      status: "Processing",
    };

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    clearCart();
    alert("Order placed successfully");
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
        <NavBar />
        <div style={{ padding: "80px 30px", textAlign: "center" }}>
          <p style={{ color: "#aaa" }}>
            Your cart is empty. Add items before checkout.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <NavBar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 30px" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "28px" }}>Checkout</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              border: "1px solid #333",
              background: "#111",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Shipping Information</h2>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>Address</label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>City</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>ZIP Code</label>
              <input
                type="text"
                required
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px" }}>Phone</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
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
              Place Order
            </button>
          </form>

          <div
            style={{
              border: "1px solid #333",
              background: "#111",
              borderRadius: "12px",
              padding: "24px",
              height: "fit-content",
            }}
          >
            <h2 style={{ marginBottom: "18px" }}>Order Summary</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#bbb" }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px solid #333",
                  paddingTop: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#222",
  color: "#fff",
  outline: "none",
};

export default Checkout;