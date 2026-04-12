import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  countInStock: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error("FETCH ERROR:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", color: "white", maxWidth: "1400px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "56px",
          fontWeight: 800,
          marginBottom: "28px",
          color: "white",
        }}
      >
        All Products
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "18px",
          marginBottom: "36px",
        }}
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "16px 30px",
                borderRadius: "18px",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                background: isActive ? "#ff5757" : "#333333",
                color: "white",
                transition: "0.3s",
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <p style={{ color: "#9ca3af", fontSize: "18px" }}>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#0b1020",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "28px",
                overflow: "hidden",
                color: "white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "380px",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x500?text=No+Image";
                }}
              />

              <div style={{ padding: "28px" }}>
                <p
                  style={{
                    color: "#ff5757",
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    margin: "0 0 18px",
                  }}
                >
                  {product.category}
                </p>

                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    margin: "0 0 22px",
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </h2>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#d1d5db",
                    margin: "0 0 22px",
                    minHeight: "48px",
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        margin: 0,
                        color: "white",
                      }}
                    >
                      ${product.price}
                    </p>
                  </div>

                  <Link
                    to={`/products/${product._id}`}
                    style={{
                      background: "#ff5757",
                      color: "white",
                      textDecoration: "none",
                      padding: "14px 24px",
                      borderRadius: "16px",
                      fontWeight: 700,
                      fontSize: "18px",
                      display: "inline-block",
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;