import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
        <NavBar />
        <div style={{ padding: "60px 30px", textAlign: "center" }}>
          <p style={{ color: "#aaa" }}>Product not found.</p>
          <Link to="/products">
            <button
              style={{
                marginTop: "16px",
                padding: "10px 18px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Back to Products
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    alert("Added to cart");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <NavBar />

      <div style={{ padding: "30px" }}>
        <Link
          to="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#aaa",
            textDecoration: "none",
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              border: "1px solid #333",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#111",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>

          <div>
            <p
              style={{
                color: "#ff4d4d",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {product.category}
            </p>

            <h1 style={{ fontSize: "36px", margin: "10px 0" }}>{product.name}</h1>

            <p style={{ fontSize: "32px", fontWeight: "bold", color: "#ff4d4d" }}>
              ${product.price.toFixed(2)}
            </p>

            <p style={{ marginTop: "20px", color: "#ccc", lineHeight: "1.7" }}>
              {product.description}
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
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
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    padding: "10px 14px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Minus size={16} />
                </button>

                <span style={{ width: "40px", textAlign: "center" }}>{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    padding: "10px 14px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Related Products</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;