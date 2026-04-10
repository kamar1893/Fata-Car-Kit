import { Package } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  address: string;
  phone: string;
  status: string;
};

const Orders = () => {
  const orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");

  const getTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <NavBar />

      <div style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "30px", fontSize: "32px" }}>My Orders</h1>

        {orders.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "80px 20px",
              color: "#aaa",
            }}
          >
            <Package size={64} />
            <h2 style={{ marginTop: "16px", color: "#fff" }}>No orders yet</h2>
            <p style={{ marginTop: "8px" }}>Your order history will appear here.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #333",
                  background: "#111",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "bold" }}>Order ID: {order.id}</p>
                    <p style={{ color: "#aaa", fontSize: "14px" }}>Phone: {order.phone}</p>
                    <p style={{ color: "#aaa", fontSize: "14px" }}>Address: {order.address}</p>
                  </div>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background: "#1f3a1f",
                      color: "#7CFC00",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #222",
                        paddingBottom: "8px",
                      }}
                    >
                      <span style={{ color: "#ccc" }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Total: ${getTotal(order.items).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;