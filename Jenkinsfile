pipeline {
    agent any

    environment {
        DOCKER_HUB = "dileepkb1718"
        IMAGE_FRONTEND = "frontend"
        IMAGE_BACKEND = "backend"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/devopsdileepkb/3-tier-devops-project.git'
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                docker build \
                  -t $DOCKER_HUB/$IMAGE_FRONTEND:latest \
                  ./frontend
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                docker build \
                  -t $DOCKER_HUB/$IMAGE_BACKEND:latest \
                  ./backend
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $DOCKER_HUB/$IMAGE_FRONTEND:latest
                    docker push $DOCKER_HUB/$IMAGE_BACKEND:latest
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                echo "Stopping old containers..."
                docker stop frontend backend mysql || true
                docker rm -f frontend backend mysql || true

                echo "Removing old network..."
                docker network rm app-network || true

                echo "Creating docker network..."
                docker network create app-network

                echo "Pulling latest images..."
                docker pull $DOCKER_HUB/$IMAGE_FRONTEND:latest
                docker pull $DOCKER_HUB/$IMAGE_BACKEND:latest

                echo "Starting MySQL..."
                docker run -d \
                  --name mysql \
                  --network app-network \
                  -e MYSQL_ROOT_PASSWORD=password \
                  -e MYSQL_DATABASE=mydb \
                  mysql:8

                echo "Waiting for MySQL..."
                sleep 20

                echo "Starting Backend..."
                docker run -d \
                  --name backend \
                  --network app-network \
                  -p 5000:5000 \
                  -e MYSQL_HOST=mysql \
                  $DOCKER_HUB/$IMAGE_BACKEND:latest

                echo "Starting Frontend..."
                docker run -d \
                  --name frontend \
                  --network app-network \
                  -p 80:80 \
                  $DOCKER_HUB/$IMAGE_FRONTEND:latest

                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful - Stackly App Updated'
        }
        failure {
            echo 'Deployment Failed - Check logs'
        }
    }
}