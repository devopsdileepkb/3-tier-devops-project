# Stackly E-Commerce Store - 3-Tier E-Commerce Project

A modern e-commerce platform for Stackly, built with React, Flask, and MySQL deployed on Kubernetes.

## Features

✅ Product catalog with search and filtering
✅ Shopping cart with quantity management  
✅ Flipkart-like responsive UI design
✅ Multiple product categories (Electronics, Mobile, Accessories)
✅ Price filtering and search functionality
✅ Order checkout and management
✅ RESTful API backend with CORS
✅ Docker containerization
✅ Kubernetes orchestration

## Architecture

User → LoadBalancer/Ingress → Frontend (React) → Backend (Flask) → MySQL

## Tech Stack

- **Frontend**: React 18 + Nginx
- **Backend**: Flask + Flask-CORS
- **Database**: MySQL 8.0
- **CI/CD**: Jenkins
- **Containers**: Docker
- **Orchestration**: Kubernetes

## Project Structure

```
3-tier-devops-project/
├── frontend/          # React e-commerce UI
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── src/App.js
├── backend/           # Flask API server
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── k8s/              # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mysql-deployment.yaml
│   ├── ingress.yaml
│   ├── namespace.yaml
│   └── secrets.yaml
├── Jenkinsfile       # CI/CD pipeline
└── docker-compose.yml
```

## API Endpoints

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/<id>` - Get single product details
- `GET /api/categories` - Get product categories
- `GET /api/search?q=query` - Search products

### Cart Management
- `GET /api/cart` - Get user shopping cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/update/<id>` - Update item quantity
- `DELETE /api/cart/remove/<id>` - Remove product from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders & Checkout
- `POST /api/checkout` - Place and confirm order
- `GET /api/orders` - Get user's order history

### Address
- `POST /api/address` - Save delivery address
- `GET /api/address` - Get saved address

## Deployment

### Local Development

```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:80
- Backend API: http://localhost:5000

### Kubernetes Deployment

```bash
# Deploy to cluster
kubectl apply -f k8s/

# Check status
kubectl get pods -n app
kubectl get svc -n app

# View logs
kubectl logs <pod-name> -n app
```

### Jenkins CI/CD

Configure pipeline job with included Jenkinsfile for automated testing and deployment.

## Installation

### Requirements
- Docker
- Docker Compose
- Node.js 18+
- Python 3.11+
- Kubernetes cluster (for production)

### Local Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Features Implemented

✅ 8 Professional E-commerce Products
✅ Advanced Search & Filtering
✅ Category-based Navigation
✅ Price Range Slider
✅ Shopping Cart with Quantity Controls
✅ Order Management System
✅ Discount Calculations (5% automatic)
✅ Free Shipping Display
✅ Order Confirmation with IDs
✅ Responsive Mobile Design
✅ Flipkart-style Color Scheme
✅ Product Ratings & Reviews

## Flipkart-Style Design

**Color Palette:**
- Primary Blue: #1f5c94
- Accent Orange: #ff9f1c
- Success Green: #388e3c
- Light Gray: #f5f5f5

**Component Design:**
- Material design inspired UI
- Sticky header with cart counter
- Sidebar filters for easy navigation
- Product cards with discount badges
- Detailed pricing breakdown in checkout

## Sample Products

- MacBook Pro 14 - ₹139,999
- iPhone 15 Pro - ₹129,999
- Sony WH-1000XM5 - ₹27,999
- Apple Watch Series 9 - ₹41,999
- Logitech MX Master - ₹9,999
- Mechanical Keyboard RGB - ₹7,999
- Samsung Galaxy S24 - ₹79,999
- Dell XPS 15 - ₹159,999

## Troubleshooting

### Check Services
```bash
kubectl get pods -n app
kubectl get svc -n app
```

### View Logs
```bash
kubectl logs <pod-name> -n app
```

### Common Issues

**CORS Errors**: Backend flask-cors is enabled
**API Connectivity**: Ensure backend is running on port 5000
**Port Already in Use**: Change docker-compose ports

## Future Enhancements

- [ ] MySQL database integration
- [ ] User authentication & registration
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] Order tracking
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] User profiles
- [ ] Real-time notifications

kubectl get svc -n three-tier
```