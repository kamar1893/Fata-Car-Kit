import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "40px" }}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Go shopping</Link></p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#111",
                marginBottom: "16px",
                padding: "16px",
                borderRadius: "12px",
              }}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
              </div>

              <div>
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <span style={{ margin: "0 12px" }}>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>

              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{ padding: "12px 20px", background: "#ff5757", color: "#fff", border: "none" }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;