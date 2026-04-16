import { useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { productsData } from "../data/products";
import NavBar from "../components/NavBar";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  countInStock: number;
}

function Home() {
  const products: Product[] = productsData;
  const loading = false;

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const product of products) {
      counts[product.category] = (counts[product.category] || 0) + 1;
    }

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [products]);

  return (
    
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
                }}
              >
                Shop Now
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
          <h2 style={{ fontSize: "32px", margin: 0 }}>Featured Products</h2>

          <Link
            to="/products"
            style={{
              color: "#ff4d4d",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <p style={{ color: "#aaa" }}>Loading featured products...</p>
        ) : featuredProducts.length === 0 ? (
          <p style={{ color: "#aaa" }}>No products found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  color: "white",
                }}
              >
                <img
  src={`http://localhost:5000${product.image}`}
  alt={product.name}
  style={{
    width: "100%",
    height: "240px",
    objectFit: "cover",
    display: "block",
  }}
  onError={(e) => {
    e.currentTarget.src = "http://localhost:5000/images/no-image.jpg";
  }}
/>

                <div style={{ padding: "18px" }}>
                  <p
                    style={{
                      color: "#ff4d4d",
                      margin: "0 0 10px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {product.category}
                  </p>

                  <h3 style={{ margin: "0 0 10px", fontSize: "22px" }}>
                    {product.name}
                  </h3>

                  <p style={{ color: "#bbb", margin: "0 0 14px", fontSize: "14px" }}>
                    {product.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
                      ${product.price}
                    </p>

                    <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
                      <button
                        style={{
                          padding: "10px 18px",
                          background: "#ff4d4d",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

          {loading ? (
            <p style={{ color: "#aaa", textAlign: "center" }}>Loading categories...</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to="/products"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      border: "1px solid #333",
                      background: "#111",
                      borderRadius: "12px",
                      padding: "22px",
                    }}
                  >
                    <h3 style={{ color: "#fff", marginBottom: "8px" }}>{cat.name}</h3>
                    <p style={{ color: "#aaa", fontSize: "14px" }}>
                      {cat.count} products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;