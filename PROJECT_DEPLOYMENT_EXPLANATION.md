# 3-Tier Application Deployment using Jenkins CI/CD on AWS

## Objective
To deploy the Stackly E-Commerce Store 3-tier application on AWS and automate deployment using Jenkins CI/CD pipeline.

## Architecture
Frontend/Web Tier: Nginx (React Application)
Application Tier: Flask/Python Application
Database Tier: MySQL (MariaDB-compatible)
CI/CD Tool: Jenkins
Cloud Platform: AWS EC2
Source Code Management: GitHub

## Infrastructure Details
Cloud: AWS
Server: EC2 Amazon Linux 2023
Web Server: Nginx
CI/CD: Jenkins
Database: MySQL
Repository: GitHub (https://github.com/devopsdileepkb/3-tier-devops-project)

## Deployment Steps

### Step 1: Launch EC2 Instance
- Created EC2 instance in AWS
- Configured security groups
- Allowed ports: 22 (SSH), 80 (HTTP), 8080 (Jenkins), 3306 (MySQL), 5000 (Backend API)

### Step 2: Install Java & Jenkins
Commands used:
```bash
sudo dnf install java-17-amazon-corretto -y
sudo dnf install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### Step 3: Configure Jenkins Pipeline
- Created Jenkins pipeline job
- Connected GitHub repository (https://github.com/devopsdileepkb/3-tier-devops-project)
- Added Jenkins pipeline script (Jenkinsfile)
- Automated build and deployment process

### Step 4: Install Docker & Docker Compose
```bash
# Install Docker
sudo yum update -y
sudo yum install -y docker
sudo usermod -a -G docker ec2-user
sudo usermod -a -G docker jenkins
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 5: Configure Jenkins Credentials
- DockerHub credentials (username: dileepkb1718)
- GitHub repository access
- EC2 SSH access for deployment

### Step 6: Deploy Application
- Jenkins clones application source code from GitHub
- Builds Docker images for frontend and backend
- Pushes images to DockerHub
- Deploys containers on EC2 instance
- Application deployed successfully

### Step 7: Install MySQL
```bash
sudo dnf install mysql -y
# Or use Docker container as in Jenkins pipeline
```

## Jenkins CI/CD Flow
GitHub → Jenkins Pipeline → Build Docker Images → Push to DockerHub → Deploy on EC2 → Application Running

## Jenkins Pipeline Stages
1. **Checkout**: Clone repository from GitHub
2. **Build Frontend**: Build React application Docker image
3. **Build Backend**: Build Flask application Docker image
4. **Push Images**: Push images to DockerHub
5. **Deploy on EC2**: Run containers on EC2 instance

## Troubleshooting

### Issue 1: Jenkins Executor Offline
- Restarted Jenkins and adjusted node settings
- Ensured Jenkins user has Docker permissions

### Issue 2: Docker Build Failures
- Verified Docker is installed and running
- Checked DockerHub credentials
- Ensured Jenkins has access to Docker socket

### Issue 3: Port Conflicts
- Stopped existing containers before deployment
- Verified ports 80, 5000, 3306 are available

### Issue 4: MySQL Connection Issues
- Waited for MySQL container to initialize (10 seconds)
- Used proper environment variables for database connection

### Issue 5: EC2 Connection Failure
- Reconnected using SSH client
- Verified security group rules
- Checked instance status

## Output
- Jenkins pipeline executed successfully
- Docker images built and pushed to DockerHub
- MySQL database container running
- Flask backend API running on port 5000
- Nginx frontend running on port 80
- 3-tier application deployed successfully

## Access URLs
- **Frontend**: http://[EC2-Public-IP]/
- **Backend API**: http://[EC2-Public-IP]:5000
- **Jenkins**: http://[EC2-Public-IP]:8080

## Conclusion
Successfully deployed the Stackly E-Commerce Store 3-tier application on AWS using Jenkins CI/CD pipeline with automated Docker container deployment.