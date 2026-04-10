import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
        <NavBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "80px 20px",
          }}
        >
          <ShoppingBag size={64} color="#888" />
          <h2 style={{ marginTop: "16px", fontSize: "26px" }}>Your cart is empty</h2>
          <p style={{ marginTop: "8px", color: "#aaa" }}>
            Add some accessories to get started!
          </p>

          <Link to="/products" style={{ marginTop: "24px" }}>
            <button
              style={{
                padding: "12px 22px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Browse Products
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <NavBar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 30px" }}>
        <h1 style={{ marginBottom: "28px", fontSize: "34px" }}>Shopping Cart</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cart.map((item: CartItem) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  border: "1px solid #333",
                  background: "#111",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "4px" }}>{item.name}</h3>
                    <p style={{ color: "#aaa", fontSize: "14px" }}>{item.category}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #444",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        style={qtyButtonStyle}
                      >
                        <Minus size={14} />
                      </button>

                      <span style={{ width: "40px", textAlign: "center" }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        style={qtyButtonStyle}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#bbb",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#bbb" }}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", color: "#bbb" }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div
                style={{
                  borderTop: "1px solid #333",
                  paddingTop: "12px",
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

            <Link to="/checkout">
              <button
                style={{
                  marginTop: "24px",
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
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const qtyButtonStyle: React.CSSProperties = {
  padding: "10px 12px",
  background: "#111",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default Cart;