# 🚀 Stackly E-Commerce App - Setup & Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Git installed
- EC2 instance with Docker (for cloud deployment)
- DockerHub account (dileepkb1718)

---

## LOCAL DEVELOPMENT

### 1. Run with Docker Compose (Recommended)

```bash
cd 3-tier-devops-project
docker-compose up --build
```

**Wait for all services to start** (MySQL takes ~10 seconds to initialize)

### 2. Access the Application

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost/ | E-commerce store UI |
| **Backend API** | http://localhost:5000/ | REST API |
| **MySQL** | localhost:3306 | Database |

### 3. Verify Services Are Running

```bash
# Check running containers
docker ps

# Expected output:
# - frontend-app (nginx)
# - backend-api (flask)
# - mysql-db
```

---

## DEPLOYMENT ON EC2

### 1. SSH into EC2

```bash
ssh -i your-key.pem ec2-user@13.206.238.246
```

### 2. Install Docker & Docker Compose

```bash
# Install Docker
sudo yum update -y
sudo yum install -y docker
sudo usermod -a -G docker ec2-user
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Clone Your Repository

```bash
git clone https://github.com/devopsdileepkb/3-tier-devops-project.git
cd 3-tier-devops-project
```

### 4. Run Application

#### Option A: Using Docker Compose (Easiest)

```bash
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option B: Using Jenkins Pipeline

1. Configure Jenkins with:
   - GitHub repository credentials
   - DockerHub credentials (username: `dileepkb1718`)
   - EC2 SSH key

2. Trigger pipeline:
   ```bash
   git push origin main  # Automatically triggers Jenkins
   ```

### 5. Verify Deployment

From EC2 terminal:

```bash
# Test backend
curl http://localhost:5000/

# Expected response:
# {"message":"Stackly E-Commerce Store Backend","version":"1.0.0","status":"Running"}

# Test API
curl http://localhost:5000/api/products

# Check containers
docker ps

# View logs
docker-compose logs backend
docker-compose logs frontend
```

### 6. Access from Browser

| Service | EC2 IP | Port |
|---------|--------|------|
| Frontend | 13.206.238.246 | 80 |
| Backend | 13.206.238.246 | 5000 |

**Important**: Your EC2 security group must allow:
- ✅ Inbound on Port 80 (HTTP) - for frontend
- ✅ Inbound on Port 5000 (HTTP) - for backend (optional)
- ✅ Port 3306 (MySQL) - internal only

---

## API ENDPOINTS

### Products
```bash
# Get all products
curl http://13.206.238.246:5000/api/products

# Search products
curl "http://13.206.238.246:5000/api/products?search=iPhone"

# Filter by category
curl "http://13.206.238.246:5000/api/products?category=Electronics"

# Price filtering
curl "http://13.206.238.246:5000/api/products?min_price=1000&max_price=50000"

# Get single product
curl http://13.206.238.246:5000/api/products/1

# Get categories
curl http://13.206.238.246:5000/api/categories
```

### Cart Management
```bash
# Get cart
curl http://13.206.238.246:5000/api/cart \
  -H "X-User-ID: user123"

# Add to cart
curl -X POST http://13.206.238.246:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "X-User-ID: user123" \
  -d '{"product_id": 1}'

# Update quantity
curl -X PUT http://13.206.238.246:5000/api/cart/update/1 \
  -H "Content-Type: application/json" \
  -H "X-User-ID: user123" \
  -d '{"quantity": 3}'

# Remove from cart
curl -X DELETE http://13.206.238.246:5000/api/cart/remove/1 \
  -H "X-User-ID: user123"

# Clear cart
curl -X DELETE http://13.206.238.246:5000/api/cart/clear \
  -H "X-User-ID: user123"
```

---

## TROUBLESHOOTING

### Frontend Not Loading
```bash
# Check nginx logs
docker logs frontend-app

# Verify port 80 is mapped
docker ps | grep frontend

# Restart frontend
docker-compose restart frontend
```

### Backend API Not Responding
```bash
# Check Flask logs
docker logs backend-api

# Verify backend port
docker ps | grep backend

# Test API connectivity
curl -v http://localhost:5000/
```

### MySQL Connection Issues
```bash
# Check MySQL is running
docker ps | grep mysql

# Check MySQL logs
docker logs mysql-db

# Verify connection
docker exec mysql-db mysql -u root -ppassword -e "SELECT 1;"
```

### Port Already in Use
```bash
# Find process using port
sudo lsof -i :80
sudo lsof -i :5000
sudo lsof -i :3306

# Kill process
sudo kill -9 <PID>
```

---

## ENVIRONMENT VARIABLES

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000)

### Backend (.env)
- `DB_HOST`: MySQL hostname (default: mysql)
- `DB_USER`: MySQL user (default: root)
- `DB_PASSWORD`: MySQL password (default: password)
- `DB_NAME`: Database name (default: mydb)
- `FLASK_ENV`: Environment (default: production)
- `PORT`: Flask port (default: 5000)

---

## DOCKER IMAGE DETAILS

### Frontend Image
- **Base**: nginx:latest
- **Size**: ~150MB
- **Ports**: 80
- **Builds React app** and serves via Nginx

### Backend Image
- **Base**: python:3.11-slim
- **Size**: ~200MB
- **Ports**: 5000
- **Framework**: Flask
- **Database**: MySQL (connected)

### MySQL Image
- **Image**: mysql:8
- **Size**: ~200MB
- **Port**: 3306
- **Storage**: Persistent volume (mysql-data)

---

## SCALING & MONITORING

### View Resource Usage
```bash
docker stats

# Follow specific container
docker stats frontend-app
```

### Increase Log Verbosity
```bash
# Backend
FLASK_ENV=development docker-compose up

# View full logs
docker-compose logs --tail=100 -f
```

### Database Backup
```bash
docker exec mysql-db mysqldump -u root -ppassword mydb > backup.sql
```

---

## PRODUCTION CHECKLIST

- [ ] Change MySQL root password in `.env`
- [ ] Set proper CORS_ORIGINS in backend .env
- [ ] Enable HTTPS/SSL certificate (nginx)
- [ ] Setup CI/CD pipeline (Jenkins)
- [ ] Configure log aggregation (ELK, DataDog, etc.)
- [ ] Setup monitoring & alerts
- [ ] Database backups automated
- [ ] Environment-specific configurations
- [ ] Security group restrictions
- [ ] Rate limiting enabled

---

## QUICK COMMANDS

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose up --build

# Remove everything (clean slate)
docker-compose down -v

# Execute command in container
docker-compose exec backend python -c "print('test')"

# Build specific service
docker-compose build frontend

# Restart service
docker-compose restart backend
```

---

**For support or issues, check logs with: `docker-compose logs`**
