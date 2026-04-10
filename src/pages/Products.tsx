import { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categories = [
  "All",
  "LED Interior Lights",
  "Steering Wheel Covers",
  "Seat Covers",
  "Floor Mats",
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "20px", fontSize: "32px" }}>
          All Products
        </h1>

        {/* Category buttons */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: activeCategory === cat ? "#ff4d4d" : "#333",
                color: "#fff",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ marginTop: "40px", textAlign: "center", color: "#aaa" }}>
            No products found in this category.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;