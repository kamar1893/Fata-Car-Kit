import { useEffect, useState } from "react";

interface Order {
  _id: string;
  user: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "40px" }}>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "#111",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "12px",
          }}
        >
          <p>User: {order.user}</p>
          <p>Total: ${order.totalPrice}</p>
          <p>Status: {order.status}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;