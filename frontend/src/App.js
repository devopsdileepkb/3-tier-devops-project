import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
  },
  {
    id: 2,
    name: "Mobile",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
  },
  {
    id: 3,
    name: "Headphones",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart`);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px"
        }}
      >
        <h1>Stackly E-Commerce Store</h1>
        <div>
          <h3>🛒 Cart: {cart.length}</h3>
          <p>Total: ₹{totalPrice}</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <h3>{product.name}</h3>
            <p style={{ fontWeight: "bold" }}>₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;