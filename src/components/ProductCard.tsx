import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "12px",
        border: "1px solid #333",
        background: "#111",
        color: "#fff",
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </Link>

      <div style={{ padding: "16px" }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#ff4d4d",
            }}
          >
            {product.category}
          </p>

          <h3 style={{ marginTop: "8px", marginBottom: "12px" }}>{product.name}</h3>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => addToCart(product)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              background: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;