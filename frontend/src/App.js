import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // API Base URL - defaults to /api (proxy through nginx) or environment variable
  const API_BASE_URL = process.env.REACT_APP_API_URL || window.location.origin;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const categories = ["All", "Electronics", "Mobile", "Accessories"];

  const defaultProducts = [
    {
      id: 1,
      name: "MacBook Pro 14",
      price: 139999,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      rating: 4.5,
      reviews: 1250,
      stock: 50,
      discount: 10
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 129999,
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.7,
      reviews: 3200,
      stock: 100,
      discount: 5
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 27999,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.6,
      reviews: 890,
      stock: 75,
      discount: 15
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      price: 41999,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      rating: 4.4,
      reviews: 567,
      stock: 60,
      discount: 8
    },
    {
      id: 5,
      name: "Logitech MX Master 3S Mouse",
      price: 9999,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      rating: 4.8,
      reviews: 445,
      stock: 120,
      discount: 12
    },
    {
      id: 6,
      name: "Mechanical Keyboard RGB",
      price: 7999,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
      rating: 4.5,
      reviews: 678,
      stock: 90,
      discount: 20
    },
    {
      id: 7,
      name: "Samsung Galaxy S24",
      price: 79999,
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.6,
      reviews: 2100,
      stock: 85,
      discount: 7
    },
    {
      id: 8,
      name: "Dell XPS 15 Laptop",
      price: 159999,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      rating: 4.5,
      reviews: 980,
      stock: 40,
      discount: 12
    }
  ];

  useEffect(() => {
    setProducts(defaultProducts);
    setFilteredProducts(defaultProducts);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterProducts(value, selectedCategory, priceRange);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category, priceRange);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    filterProducts(searchTerm, selectedCategory, range);
  };

  const filterProducts = (search, category, range) => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    filtered = filtered.filter(
      (p) => p.price >= range[0] && p.price <= range[1]
    );

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    alert(`Order placed! Total: ₹${(cartTotal * 0.95).toFixed(2)}\n\nOrder ID: #FK${Date.now()}`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#1f5c94",
        color: "white",
        padding: "15px 20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>🛍️ Stackly E-Commerce Store</div>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{
              backgroundColor: "#fff",
              color: "#1f5c94",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div style={{
        backgroundColor: "#fff",
        padding: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: "#f9f9f9"
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1400px", margin: "0 auto", gap: "20px", padding: "0 20px 20px 20px" }}>
        {/* Sidebar - Filters */}
        {!showCart && (
          <aside style={{
            width: "220px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "4px",
            height: "fit-content",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ marginTop: 0, color: "#1f5c94" }}>Categories</h3>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  marginBottom: "10px",
                  backgroundColor: selectedCategory === category ? "#1f5c94" : "#f5f5f5",
                  color: selectedCategory === category ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: selectedCategory === category ? "bold" : "normal"
                }}
              >
                {category}
              </button>
            ))}

            <h3 style={{ marginTop: "30px", color: "#1f5c94" }}>Price Range</h3>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([0, parseInt(e.target.value)])}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "12px", color: "#666" }}>
              ₹0 - ₹{priceRange[1].toLocaleString()}
            </p>
          </aside>
        )}

        {/* Main Content */}
        {!showCart ? (
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "0 0 20px 0" }}>
              {selectedCategory === "All" ? "All Products" : selectedCategory} ({filteredProducts.length})
            </h2>

            {filteredProducts.length === 0 ? (
              <div style={{
                backgroundColor: "#fff",
                padding: "40px",
                textAlign: "center",
                borderRadius: "4px"
              }}>
                <p style={{ fontSize: "18px", color: "#666" }}>No products found</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px"
              }}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover"
                        }}
                      />
                      {product.discount && (
                        <div style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "#ff9f1c",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}>
                          {product.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "12px" }}>
                      <h4 style={{
                        margin: "0 0 6px 0",
                        fontSize: "13px",
                        height: "32px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {product.name}
                      </h4>
                      <p style={{
                        color: "#ff9f1c",
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "6px 0"
                      }}>
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p style={{
                        fontSize: "12px",
                        color: "#388e3c",
                        margin: "4px 0"
                      }}>
                        ⭐ {product.rating} ({product.reviews})
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "#ff9f1c",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Cart View */
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "0 0 20px 0" }}>Shopping Cart</h2>
            {cart.length === 0 ? (
              <div style={{
                backgroundColor: "#fff",
                padding: "40px",
                textAlign: "center",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <p style={{ fontSize: "18px", color: "#666" }}>Your cart is empty</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: "#fff",
                        padding: "16px",
                        marginBottom: "12px",
                        borderRadius: "4px",
                        display: "flex",
                        gap: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "4px"
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 8px 0" }}>{item.name}</h4>
                        <p style={{
                          color: "#ff9f1c",
                          fontWeight: "bold",
                          fontSize: "16px",
                          margin: "0 0 8px 0"
                        }}>
                          ₹{item.price.toLocaleString()}
                        </p>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#f5f5f5",
                              border: "1px solid #ddd",
                              cursor: "pointer",
                              borderRadius: "4px"
                            }}
                          >
                            -
                          </button>
                          <span style={{ padding: "0 12px" }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#f5f5f5",
                              border: "1px solid #ddd",
                              cursor: "pointer",
                              borderRadius: "4px"
                            }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              marginLeft: "auto",
                              padding: "4px 8px",
                              backgroundColor: "#ff6b6b",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: "4px"
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  backgroundColor: "#fff",
                  padding: "16px",
                  borderRadius: "4px",
                  height: "fit-content",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{ marginTop: 0 }}>Price Details</h3>
                  <div style={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "12px",
                    marginBottom: "12px"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px"
                    }}>
                      <span>Subtotal:</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      color: "#ff9f1c"
                    }}>
                      <span>Discount:</span>
                      <span>-₹{(cartTotal * 0.05).toLocaleString()}</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <span>Shipping:</span>
                      <span style={{ color: "#388e3c" }}>FREE</span>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "16px"
                  }}>
                    <span>Total:</span>
                    <span>₹{(cartTotal * 0.95).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#ff9f1c",
                      color: "white",
                      border: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      borderRadius: "4px"
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;