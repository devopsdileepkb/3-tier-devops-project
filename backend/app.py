from flask import Flask, jsonify, request

app = Flask(__name__)

# Product catalog
products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 55000,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 25000,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        "id": 4,
        "name": "Smart Watch",
        "price": 8000,
        "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
    },
    {
        "id": 5,
        "name": "Gaming Mouse",
        "price": 1500,
        "image": "https://images.unsplash.com/photo-1527814050087-3793815479db"
    },
    {
        "id": 6,
        "name": "Keyboard",
        "price": 2500,
        "image": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
    }
]

# In-memory cart
cart = []

# Delivery details
delivery_address = {}


@app.route("/")
def home():
    return "E-Commerce Backend Running Successfully"


@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)


@app.route("/cart", methods=["GET"])
def get_cart():
    total_price = sum(item["price"] * item["quantity"] for item in cart)

    return jsonify({
        "cart_items": cart,
        "total_price": total_price,
        "delivery_address": delivery_address
    })


@app.route("/cart/add", methods=["POST"])
def add_to_cart():
    data = request.json
    product_id = data.get("product_id")

    product = next((p for p in products if p["id"] == product_id), None)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    existing_item = next((item for item in cart if item["id"] == product_id), None)

    if existing_item:
        existing_item["quantity"] += 1
    else:
        cart.append({
            "id": product["id"],
            "name": product["name"],
            "price": product["price"],
            "quantity": 1
        })

    return jsonify({"message": "Product added to cart"})


@app.route("/cart/remove/<int:product_id>", methods=["DELETE"])
def remove_from_cart(product_id):
    global cart
    cart = [item for item in cart if item["id"] != product_id]

    return jsonify({"message": "Product removed from cart"})


@app.route("/cart/update/<int:product_id>", methods=["PUT"])
def update_quantity(product_id):
    data = request.json
    quantity = data.get("quantity", 1)

    for item in cart:
        if item["id"] == product_id:
            item["quantity"] = quantity
            return jsonify({"message": "Quantity updated"})

    return jsonify({"message": "Product not found in cart"}), 404


@app.route("/address", methods=["POST"])
def save_address():
    global delivery_address
    data = request.json

    delivery_address = {
        "name": data.get("name"),
        "mobile": data.get("mobile"),
        "address": data.get("address"),
        "city": data.get("city"),
        "pincode": data.get("pincode")
    }

    return jsonify({"message": "Address saved successfully"})


@app.route("/checkout", methods=["GET"])
def checkout():
    total_price = sum(item["price"] * item["quantity"] for item in cart)

    return jsonify({
        "products": cart,
        "delivery_address": delivery_address,
        "total_price": total_price,
        "message": "Order ready for checkout"
    })


@app.route("/health")
def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)