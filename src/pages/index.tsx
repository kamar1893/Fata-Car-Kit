import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categories = [
  "LED Interior Lights",
  "Steering Wheel Covers",
  "Seat Covers",
  "Floor Mats",
];

const featuredProducts = products.slice(0, 4);

const Index = () => (
  <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
    <NavBar />

    <section
      style={{
        padding: "80px 30px",
        borderBottom: "1px solid #222",
        background:
          "linear-gradient(135deg, rgba(255,77,77,0.12), rgba(0,0,0,1) 45%)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            borderRadius: "999px",
            background: "#111",
            border: "1px solid #333",
            color: "#ff4d4d",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          <Sparkles size={14} />
          Premium Car Accessories
        </div>

        <h1
          style={{
            fontSize: "56px",
            lineHeight: "1.1",
            marginTop: "18px",
            marginBottom: "16px",
            maxWidth: "700px",
          }}
        >
          Upgrade Your <span style={{ color: "#ff4d4d" }}>Ride</span> in Style
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#bbb",
            maxWidth: "720px",
            lineHeight: "1.7",
          }}
        >
          Discover premium car decoration accessories that transform your
          vehicle&apos;s interior and exterior.
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            marginTop: "28px",
          }}
        >
          <Link to="/products">
            <button
              style={{
                padding: "12px 22px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Shop Now <ArrowRight size={16} />
            </button>
          </Link>

          <Link to="/products">
            <button
              style={{
                padding: "12px 22px",
                background: "transparent",
                color: "#fff",
                border: "1px solid #555",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Browse Categories
            </button>
          </Link>
        </div>
      </div>
    </section>

    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "32px" }}>Featured Products</h2>

        <Link
          to="/products"
          style={{
            color: "#ff4d4d",
            textDecoration: "none",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {featuredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>

    <section
      style={{
        borderTop: "1px solid #222",
        background: "#0d0d0d",
        padding: "60px 30px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "28px",
          }}
        >
          Shop by Category
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat}
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #333",
                  background: "#111",
                  borderRadius: "12px",
                  padding: "22px",
                  transition: "0.2s",
                }}
              >
                <h3 style={{ color: "#fff", marginBottom: "8px" }}>{cat}</h3>
                <p style={{ color: "#aaa", fontSize: "14px" }}>
                  {products.filter((p) => p.category === cat).length} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;