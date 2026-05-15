# Stackly E-Commerce Store - Project Explanation

## Project Overview

**Stackly E-Commerce Store** is a modern, full-stack 3-tier web application that demonstrates enterprise-level DevOps practices. It's an e-commerce platform similar to Flipkart where users can browse products, filter by category and price, add items to a cart, and proceed to checkout.

---

## How It Works - Architecture Flow

### User Interaction Flow
```
User Opens Browser
    ↓
Accesses Frontend (Nginx) on Port 80
    ↓
Loads React Application (Static Assets)
    ↓
User Browses Products & Interacts with App
    ↓
App Uses Local Data (Products List)
    ↓
Add to Cart, Filter, Search, Checkout
    ↓
Order Confirmation Displayed
```

### System Architecture - 3 Tiers

#### **Tier 1: Frontend (Presentation Layer)**
- **Technology**: React.js 18.0
- **Server**: Nginx (production web server)
- **Port**: 80 (HTTP)
- **Purpose**: User interface for browsing products, searching, filtering, and managing shopping cart
- **What it does**:
  - Displays product catalog (8 premium products)
  - Search products by name
  - Filter by category (Electronics, Mobile, Accessories)
  - Filter by price range (₹0 - ₹200,000)
  - Add/remove products from cart
  - Manage cart quantities
  - Show order summary with pricing and discounts
  - Display order confirmation

#### **Tier 2: Backend (Application Layer)**
- **Technology**: Flask (Python web framework)
- **Language**: Python 3.11+
- **Port**: 5000
- **Purpose**: RESTful API that handles business logic and data processing
- **What it does**:
  - Serves product data via API endpoints
  - Manages shopping cart operations
  - Processes orders/checkout
  - Handles user addresses
  - Provides search and filtering logic
  - Connects frontend to database

#### **Tier 3: Database (Data Layer)**
- **Technology**: MySQL 8.0
- **Port**: 3306
- **Purpose**: Persistent data storage
- **What it stores**:
  - Products catalog
  - Orders history
  - User shopping carts
  - Delivery addresses
  - User sessions (future enhancement)

---

## Technology Stack

### Frontend Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 18.0 |
| HTTP Client | Axios | 1.4.0 |
| Build Tool | Create React App | - |
| Package Manager | npm | 9+ |
| Styling | CSS (Inline) | - |
| Server | Nginx | Latest |

### Backend Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Flask | Latest |
| Language | Python | 3.11+ |
| CORS Support | Flask-CORS | Latest |
| Database Driver | PyMySQL | Latest |
| Package Manager | pip | - |

### Database Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| DBMS | MySQL | 8.0 |
| Storage | Persistent Volumes | - |

### DevOps & Deployment Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| Containerization | Docker | Latest |
| Orchestration | Kubernetes (K8s) | Latest |
| CI/CD Pipeline | Jenkins | Latest |
| Reverse Proxy | Nginx | Latest |
| Compose | Docker Compose | 1.29+ |
| Cloud Platform | AWS EC2 | - |
| Container Registry | DockerHub | - |
| SCM | GitHub | - |

---

## Key Features

### Product Management
✅ Display 8 premium products with details (name, price, rating, discount)
✅ Product images, descriptions, stock availability
✅ Rating and reviews count for each product

### Search & Filtering
✅ Real-time search by product name
✅ Filter by category (All, Electronics, Mobile, Accessories)
✅ Filter by price range using slider (₹0 - ₹200,000)
✅ Combined filtering (search + category + price simultaneously)
✅ Search results counter

### Shopping Cart
✅ Add products to cart
✅ Increase/decrease quantity
✅ Remove products from cart
✅ View cart summary
✅ Prevent duplicate products (merge quantities)
✅ Cart item count badge in header

### Pricing & Discounts
✅ Display original price
✅ Show discount percentage for each product
✅ Calculate subtotal from all items
✅ Apply 5% automatic discount on checkout
✅ Free shipping
✅ Display final total price

### Checkout & Orders
✅ Order placement with confirmation
✅ Generate unique order ID (#FK + timestamp)
✅ Order summary with items and pricing
✅ Clear cart after successful order
✅ Order history tracking

### User Experience
✅ Responsive design (works on all devices)
✅ Sticky header navigation
✅ Color-coded UI (Professional colors)
✅ Loading states and error handling
✅ Smooth interactions and animations

---

## Project Structure

```
3-tier-devops-project/
│
├── frontend/                          # React Frontend Application
│   ├── Dockerfile                     # Build React app, serve with Nginx
│   ├── nginx.conf                     # Nginx routing configuration
│   ├── package.json                   # Node.js dependencies
│   ├── public/
│   │   └── index.html                 # HTML entry point
│   └── src/
│       ├── App.js                     # Main React component (1000+ lines)
│       └── index.js                   # React DOM initialization
│
├── backend/                           # Flask Backend API
│   ├── Dockerfile                     # Python 3.11 container
│   ├── app.py                         # Flask API server (300+ lines)
│   ├── requirements.txt               # Python dependencies
│   └── init.sql                       # Database initialization script
│
├── k8s/                               # Kubernetes Deployment Manifests
│   ├── namespace.yaml                 # Isolated namespace 'app'
│   ├── mysql-deployment.yaml          # Database pod configuration
│   ├── backend-deployment.yaml        # Backend API pod configuration
│   ├── frontend-deployment.yaml       # Frontend pod configuration
│   ├── secrets.yaml                   # Sensitive data (DB passwords)
│   └── ingress.yaml                   # External traffic routing
│
├── Jenkinsfile                        # CI/CD Pipeline Configuration
├── docker-compose.yml                 # Local development orchestration
├── README.md                          # Quick start guide
├── SETUP.md                           # Detailed setup instructions
├── DOCUMENTATION.md                   # Complete project documentation
├── PROJECT_EXPLANATION.md             # This file
└── .gitignore                         # Git ignore rules
```

---

## How Each Component Works

### Frontend (React Application)

**File**: `frontend/src/App.js` (~1000 lines)

**Key Functions**:
1. `filterProducts()` - Filters products based on search, category, and price range
2. `addToCart()` - Adds product to cart or increases quantity if exists
3. `removeFromCart()` - Removes product from cart
4. `updateQuantity()` - Changes product quantity in cart
5. `handleCheckout()` - Processes order and displays confirmation

**State Management** (React Hooks):
- `products[]` - Full product catalog
- `filteredProducts[]` - Filtered results based on user input
- `cart[]` - Current shopping cart items
- `searchTerm` - Search input
- `selectedCategory` - Active category filter
- `priceRange[]` - Current price filter values
- `showCart` - Toggle between product grid and cart view

**UI Components**:
- Header with logo and cart badge
- Search bar for product search
- Sidebar with category buttons and price slider
- Product grid with cards (image, price, rating, discount)
- Shopping cart view with summary
- Checkout button with order confirmation

---

### Backend (Flask API)

**File**: `backend/app.py` (~300 lines)

**API Endpoints**:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Home/health check |
| GET | `/api/products` | Get all products with filters |
| GET | `/api/products/<id>` | Get single product details |
| GET | `/api/categories` | Get all categories |
| GET | `/api/cart` | Get user's shopping cart |
| POST | `/api/cart/add` | Add product to cart |
| DELETE | `/api/cart/remove/<id>` | Remove product from cart |
| PUT | `/api/cart/update/<id>` | Update product quantity |
| DELETE | `/api/cart/clear` | Clear entire cart |
| POST | `/api/address` | Save delivery address |
| GET | `/api/address` | Get saved address |
| POST | `/api/checkout` | Process order |
| GET | `/api/orders` | Get user's order history |
| GET | `/api/search` | Search products |
| GET | `/api/health` | Health check endpoint |

**Key Features**:
- CORS enabled (allows frontend requests)
- In-memory data storage (fast access)
- RESTful architecture
- Error handling and validation
- User session management via headers

---

### Database (MySQL)

**Structure**:
```sql
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  price INT,
  category VARCHAR(100),
  image URL,
  rating FLOAT,
  reviews INT,
  stock INT,
  discount INT,
  description TEXT
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password HASHED,
  created_at TIMESTAMP
);

CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  user_id INT,
  items JSON,
  total_price INT,
  discount INT,
  final_total INT,
  status VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT
);

CREATE TABLE addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  name VARCHAR(255),
  mobile VARCHAR(10),
  address TEXT,
  city VARCHAR(100),
  pincode VARCHAR(10)
);
```

---

## Deployment Methods

### Method 1: Local Development (Docker Compose)

**What it does**: Runs all 3 tiers on your local machine in Docker containers

**Steps**:
```bash
cd 3-tier-devops-project
docker-compose up --build
```

**Access**:
- Frontend: http://localhost/
- Backend API: http://localhost:5000
- Database: localhost:3306

**Services**:
- Nginx (frontend on port 80)
- Flask (backend on port 5000)
- MySQL (database on port 3306)

---

### Method 2: Kubernetes Deployment

**What it does**: Deploys application across multiple pods in a Kubernetes cluster

**Steps**:
```bash
kubectl apply -f k8s/

# Verify
kubectl get pods -n app
kubectl get svc -n app
kubectl get ingress -n app
```

**Components**:
- Namespace: `app` (isolated environment)
- Frontend Deployment: React/Nginx pods
- Backend Deployment: Flask API pods
- MySQL StatefulSet: Database pod with persistent storage
- Ingress: Routes external traffic to frontend

---

### Method 3: AWS EC2 with Jenkins CI/CD Pipeline

**What it does**: Automates build, test, and deployment to AWS cloud

**Jenkins Pipeline Stages**:

1. **Checkout** 
   - Clones GitHub repository

2. **Build Frontend**
   - Builds React application
   - Creates Docker image for frontend
   - Tags: `dileepkb1718/frontend:latest`

3. **Build Backend**
   - Builds Flask application
   - Creates Docker image for backend
   - Tags: `dileepkb1718/backend:latest`

4. **Push Images**
   - Logs into DockerHub
   - Pushes frontend image
   - Pushes backend image

5. **Deploy on EC2**
   - Stops old containers
   - Creates Docker network
   - Pulls latest images
   - Starts MySQL container
   - Starts Backend container
   - Starts Frontend container
   - Verifies deployment

**Access**:
- Frontend: http://[EC2-Public-IP]/
- Backend API: http://[EC2-Public-IP]:5000
- Jenkins: http://[EC2-Public-IP]:8080

**Flow**:
```
GitHub Push 
    ↓ (Webhook triggers)
Jenkins Pipeline Triggered
    ↓
Build Docker Images
    ↓
Push to DockerHub
    ↓
Pull on EC2
    ↓
Run Containers
    ↓
Application Live
```

---

## Why This Architecture?

### Frontend (React + Nginx)
- **React**: Build interactive user interfaces with reusable components
- **Nginx**: Lightweight web server, excellent for serving static files, reverse proxy capabilities
- **Benefits**: Fast, responsive, easy to scale, great user experience

### Backend (Flask + Python)
- **Flask**: Lightweight, flexible Python framework
- **Python**: Easy to learn, powerful, great for rapid development
- **Benefits**: Simple to maintain, handles business logic, API development
- **CORS Enabled**: Allows frontend to communicate across domains

### Database (MySQL)
- **MySQL**: Reliable, open-source relational database
- **Benefits**: ACID compliance, data integrity, excellent for structured data
- **Future**: Can upgrade to cloud database (AWS RDS, Google Cloud SQL)

### Docker Containerization
- **Benefit 1**: Consistency - "works on my machine" works everywhere
- **Benefit 2**: Scalability - easily run multiple instances
- **Benefit 3**: Isolation - each service runs independently
- **Benefit 4**: Easy deployment - just pull and run image

### Kubernetes Orchestration
- **Benefit 1**: Auto-scaling - increase pods under high traffic
- **Benefit 2**: Load balancing - distributes traffic across pods
- **Benefit 3**: Self-healing - restarts failed containers
- **Benefit 4**: Rolling updates - deploy without downtime

### Jenkins CI/CD
- **Benefit 1**: Automation - no manual deployments needed
- **Benefit 2**: Continuous Integration - test on every push
- **Benefit 3**: Continuous Deployment - automatic updates to production
- **Benefit 4**: Webhook integration - triggered by GitHub commits

---

## Data Flow Example: User Adding Product to Cart

```
1. User clicks "Add to Cart" button on MacBook Pro

2. React App triggers addToCart() function
   - Checks if product already in cart
   - If exists: increases quantity by 1
   - If new: adds product with quantity 1

3. React State Updates
   - setCart() updates cart array
   - UI re-renders showing updated cart count

4. User sees:
   - Cart badge changes from (0) to (1)
   - Success message

5. User can now:
   - Continue shopping
   - View cart
   - Increase/decrease quantity
   - Remove item
   - Proceed to checkout
```

---

## Checkout Flow Example

```
1. User clicks "Place Order" button

2. React App validates:
   - Is cart empty? If yes, show error
   - If cart valid, calculate totals

3. Calculations:
   - Subtotal = Sum of (price × quantity) for each item
   - Discount = Subtotal × 5%
   - Shipping = FREE
   - Final Total = Subtotal - Discount

4. Display Order Summary:
   - Order ID: #FK + timestamp (e.g., #FK1716048000)
   - Items in order
   - Subtotal: ₹139,999
   - Discount (5%): ₹7,000
   - Shipping: FREE
   - Final Total: ₹132,999

5. Clear Cart:
   - setCart([]) empties the cart
   - User sees empty cart message
   - Cart badge shows (0)
```

---

## Filter Example: Search + Category + Price

```
User Input:
- Search: "laptop"
- Category: "Electronics"
- Price Range: ₹100,000 - ₹160,000

Filter Logic:
1. Start with all 8 products
2. Filter by category "Electronics"
   → Dell XPS 15, MacBook Pro 14
3. Filter by search "laptop"
   → Dell XPS 15, MacBook Pro 14
4. Filter by price ₹100,000 - ₹160,000
   → Dell XPS 15 (₹159,999) ✓
   → MacBook Pro 14 (₹139,999) ✓

Result: Shows 2 products matching all criteria
```

---

## Security Features (Current)

✅ CORS enabled for safe cross-domain requests
✅ Input validation on backend
✅ Error handling and logging
✅ Environment variable support

## Security Enhancements (Future)

⏳ HTTPS/TLS encryption
⏳ JWT authentication tokens
⏳ Rate limiting on API endpoints
⏳ SQL injection prevention
⏳ XSS protection (HTML sanitization)
⏳ CSRF tokens
⏳ Database password encryption
⏳ Kubernetes Secrets for sensitive data

---

## Performance Optimizations

### Frontend
- Client-side filtering (no API calls needed)
- Responsive grid layout
- Efficient React re-renders with hooks
- Lazy loading for images

### Backend
- In-memory data for fast access
- RESTful API design
- Proper HTTP caching headers
- Health check endpoint for monitoring

### Database
- Indexed product IDs
- Connection pooling (future)
- Query optimization

### DevOps
- Docker image caching
- Multi-stage builds
- Kubernetes resource limits
- Horizontal pod autoscaling (future)

---

## Scaling Strategy

### Horizontal Scaling (Add more servers)
```
Single Server:
Frontend (1) → Backend (1) → Database (1)

Scaled Architecture:
Frontend (3) → Load Balancer → Backend (3) → Database (Master-Slave)
```

### Using Kubernetes
- Add more frontend replicas
- Add more backend replicas
- Database replication
- Auto-scaling based on CPU/memory

### Using AWS
- EC2 Auto Scaling Groups
- RDS for managed database
- ElasticCache for caching
- CloudFront for CDN

---

## Troubleshooting Guide

### Issue: Blank Page
**Cause**: Frontend loaded but JavaScript crashed
**Solution**: 
- Check browser console for errors
- Check Nginx logs: `docker logs frontend`
- Verify static files exist in Nginx

### Issue: API Connection Failed
**Cause**: Backend not responding
**Solution**:
- Check backend container: `docker ps`
- View logs: `docker logs backend`
- Verify port 5000 is open

### Issue: Database Connection Error
**Cause**: MySQL not initialized
**Solution**:
- Wait 30 seconds for MySQL to start
- Check logs: `docker logs mysql`
- Verify credentials in environment variables

### Issue: Containers Won't Start
**Cause**: Port already in use
**Solution**:
```bash
# Find process using port
lsof -i :80          # Port 80
lsof -i :5000        # Port 5000
lsof -i :3306        # Port 3306

# Kill process
kill -9 <PID>

# Or use different port in docker-compose
```

---

## Summary

**Stackly E-Commerce Store** is a complete, production-ready 3-tier application that demonstrates:

✅ Modern frontend development (React)
✅ RESTful API design (Flask)
✅ Database management (MySQL)
✅ Docker containerization
✅ Kubernetes orchestration
✅ Jenkins CI/CD automation
✅ Cloud deployment (AWS)
✅ DevOps best practices

The project is **fully scalable**, **easily deployable**, and **industry-standard** for enterprise applications.
