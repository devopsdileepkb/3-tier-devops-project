from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Product catalog with extended details for Flipkart-like e-commerce
products = [
    {
        "id": 1,
        "name": "MacBook Pro 14",
        "price": 139999,
        "category": "Electronics",
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        "rating": 4.5,
        "reviews": 1250,
        "stock": 50,
        "discount": 10,
        "description": "Powerful MacBook Pro with M3 chip for professionals"
    },
    {
        "id": 2,
        "name": "iPhone 15 Pro",
        "price": 129999,
        "category": "Mobile",
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        "rating": 4.7,
        "reviews": 3200,
        "stock": 100,
        "discount": 5,
        "description": "Latest iPhone with advanced camera system"
    },
    {
        "id": 3,
        "name": "Sony WH-1000XM5 Headphones",
        "price": 27999,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "rating": 4.6,
        "reviews": 890,
        "stock": 75,
        "discount": 15,
        "description": "Premium noise-cancelling headphones"
    },
    {
        "id": 4,
        "name": "Apple Watch Series 9",
        "price": 41999,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
        "rating": 4.4,
        "reviews": 567,
        "stock": 60,
        "discount": 8,
        "description": "Advanced smartwatch with fitness tracking"
    },
    {
        "id": 5,
        "name": "Logitech MX Master 3S Mouse",
        "price": 9999,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
        "rating": 4.8,
        "reviews": 445,
        "stock": 120,
        "discount": 12,
        "description": "Professional-grade wireless mouse"
    },
    {
        "id": 6,
        "name": "Mechanical Keyboard RGB",
        "price": 7999,
        "category": "Accessories",
        "image": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
        "rating": 4.5,
        "reviews": 678,
        "stock": 90,
        "discount": 20,
        "description": "RGB mechanical keyboard with Cherry MX switches"
    },
    {
        "id": 7,
        "name": "Samsung Galaxy S24",
        "price": 79999,
        "category": "Mobile",
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        "rating": 4.6,
        "reviews": 2100,
        "stock": 85,
        "discount": 7,
        "description": "Flagship Android phone with AI features"
    },
    {
        "id": 8,
        "name": "Dell XPS 15 Laptop",
        "price": 159999,
        "category": "Electronics",
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        "rating": 4.5,
        "reviews": 980,
        "stock": 40,
        "discount": 12,
        "description": "High-performance Windows laptop for creators"
    }
]

# In-memory storage
user_carts = {}
orders = []
delivery_addresses = {}


def get_user_id():
    """Get user ID from session or generate one"""
    user_id = request.headers.get('X-User-ID', 'guest')
    return user_id


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Stackly E-Commerce Store Backend",
        "version": "1.0.0",
        "status": "Running"
    })


@app.route("/api/products", methods=["GET"])
def get_products():
    """Get all products with optional filtering"""
    category = request.args.get('category')
    search = request.args.get('search', '').lower()
    min_price = request.args.get('min_price', 0, type=int)
    max_price = request.args.get('max_price', 999999, type=int)
    
    filtered_products = products
    
    if category and category != "All":
        filtered_products = [p for p in filtered_products if p['category'] == category]
    
    if search:
        filtered_products = [p for p in filtered_products if search in p['name'].lower()]
    
    filtered_products = [p for p in filtered_products if min_price <= p['price'] <= max_price]
    
    return jsonify(filtered_products)


@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    """Get single product details"""
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)


@app.route("/api/categories", methods=["GET"])
def get_categories():
    """Get all product categories"""
    categories = list(set(p['category'] for p in products))
    return jsonify({"categories": categories})


@app.route("/api/cart", methods=["GET"])
def get_cart():
    """Get user's shopping cart"""
    user_id = get_user_id()
    cart = user_carts.get(user_id, [])
    
    total_price = sum(item["price"] * item["quantity"] for item in cart)
    discount = total_price * 0.05
    final_total = total_price - discount
    
    return jsonify({
        "cart_items": cart,
        "total_price": total_price,
        "discount": discount,
        "final_total": final_total,
        "item_count": sum(item["quantity"] for item in cart)
    })


@app.route("/api/cart/add", methods=["POST"])
def add_to_cart():
    """Add product to cart"""
    user_id = get_user_id()
    data = request.json
    product_id = data.get("product_id")
    
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    if user_id not in user_carts:
        user_carts[user_id] = []
    
    cart = user_carts[user_id]
    existing_item = next((item for item in cart if item["id"] == product_id), None)
    
    if existing_item:
        existing_item["quantity"] += 1
    else:
        cart.append({
            "id": product["id"],
            "name": product["name"],
            "price": product["price"],
            "image": product["image"],
            "category": product["category"],
            "quantity": 1
        })
    
    return jsonify({"message": "Product added to cart", "cart": cart})


@app.route("/api/cart/remove/<int:product_id>", methods=["DELETE"])
def remove_from_cart(product_id):
    """Remove product from cart"""
    user_id = get_user_id()
    if user_id in user_carts:
        user_carts[user_id] = [item for item in user_carts[user_id] if item["id"] != product_id]
    
    return jsonify({"message": "Product removed from cart"})


@app.route("/api/cart/update/<int:product_id>", methods=["PUT"])
def update_cart_item(product_id):
    """Update quantity of product in cart"""
    user_id = get_user_id()
    data = request.json
    quantity = data.get("quantity", 1)
    
    if user_id in user_carts:
        for item in user_carts[user_id]:
            if item["id"] == product_id:
                if quantity <= 0:
                    user_carts[user_id] = [i for i in user_carts[user_id] if i["id"] != product_id]
                else:
                    item["quantity"] = quantity
                return jsonify({"message": "Quantity updated"})
    
    return jsonify({"error": "Product not found in cart"}), 404


@app.route("/api/cart/clear", methods=["DELETE"])
def clear_cart():
    """Clear the entire cart"""
    user_id = get_user_id()
    if user_id in user_carts:
        del user_carts[user_id]
    return jsonify({"message": "Cart cleared"})


@app.route("/api/address", methods=["POST"])
def save_address():
    """Save delivery address"""
    user_id = get_user_id()
    data = request.json
    
    delivery_addresses[user_id] = {
        "name": data.get("name"),
        "mobile": data.get("mobile"),
        "address": data.get("address"),
        "city": data.get("city"),
        "pincode": data.get("pincode")
    }
    
    return jsonify({"message": "Address saved successfully"})


@app.route("/api/address", methods=["GET"])
def get_address():
    """Get saved delivery address"""
    user_id = get_user_id()
    address = delivery_addresses.get(user_id, {})
    return jsonify(address)


@app.route("/api/checkout", methods=["POST"])
def checkout():
    """Process order checkout"""
    user_id = get_user_id()
    cart = user_carts.get(user_id, [])
    
    if not cart:
        return jsonify({"error": "Cart is empty"}), 400
    
    address = delivery_addresses.get(user_id, {})
    if not address:
        return jsonify({"error": "No delivery address provided"}), 400
    
    total_price = sum(item["price"] * item["quantity"] for item in cart)
    discount = total_price * 0.05
    final_total = total_price - discount
    
    order = {
        "order_id": f"#FK{len(orders) + 1000}",
        "user_id": user_id,
        "items": cart,
        "address": address,
        "total_price": total_price,
        "discount": discount,
        "final_total": final_total,
        "status": "Order Confirmed",
        "timestamp": datetime.now().isoformat()
    }
    
    orders.append(order)
    user_carts[user_id] = []
    
    return jsonify({
        "message": "Order placed successfully",
        "order": order
    })


@app.route("/api/orders", methods=["GET"])
def get_orders():
    """Get user's orders"""
    user_id = get_user_id()
    user_orders = [order for order in orders if order["user_id"] == user_id]
    return jsonify({"orders": user_orders})


@app.route("/api/search", methods=["GET"])
def search():
    """Search products"""
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify([])
    
    search_results = [p for p in products if query in p['name'].lower() or query in p['description'].lower()]
    return jsonify(search_results)


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Backend is running"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)