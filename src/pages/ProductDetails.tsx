import { Link, useParams } from "react-router-dom";
import { productsData } from "../data/products";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  countInStock: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = productsData.find((p) => p._id === id);

  if (!product) {
    return (
      <div style={{ padding: "40px", color: "white", background: "#000", minHeight: "100vh" }}>
        Product not found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        padding: "40px",
      }}
    >
      <Link
        to="/products"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          color: "#a5b4fc",
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        ← Back to Products
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            background: "#111",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/900x650?text=No+Image";
            }}
          />
        </div>

        <div style={{ paddingTop: "20px" }}>
          <h1 style={{ fontSize: "52px", margin: "0 0 18px", lineHeight: 1.1 }}>
            {product.name}
          </h1>

          <p style={{ color: "#9ca3af", fontSize: "24px", margin: "0 0 24px" }}>
            {product.category}
          </p>

          <h2 style={{ fontSize: "44px", margin: "0 0 28px" }}>
            ${product.price}
          </h2>

          <p
            style={{
              lineHeight: 1.8,
              fontSize: "22px",
              color: "#e5e7eb",
              marginBottom: "26px",
            }}
          >
            {product.description}
          </p>

          <p style={{ fontSize: "24px", marginBottom: "28px" }}>
            Stock: {product.countInStock}
          </p>

          <button
            style={{
              padding: "16px 28px",
              border: "none",
              borderRadius: "14px",
              background: "#ff5757",
              color: "white",
              fontWeight: 700,
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;