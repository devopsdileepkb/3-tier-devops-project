pipeline {
    agent any

    environment {
        DOCKER_HUB = "dileepkb1718"
        IMAGE_FRONTEND = "frontend"
        IMAGE_BACKEND = "backend"
        EC2_IP = "13.206.238.246"
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
                --build-arg REACT_APP_API_URL=http://$EC2_IP:5000 \
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

        stage('Deploy on EC2') {
            steps {
                sh '''
                echo "Stopping old containers..."
                docker rm -f frontend backend mysql || true

                echo "Removing old images..."
                docker rmi $DOCKER_HUB/$IMAGE_FRONTEND:latest || true
                docker rmi $DOCKER_HUB/$IMAGE_BACKEND:latest || true

                echo "Pulling latest images..."
                docker pull $DOCKER_HUB/$IMAGE_FRONTEND:latest
                docker pull $DOCKER_HUB/$IMAGE_BACKEND:latest

                echo "Starting MySQL container..."
                docker run -d --name mysql \
                  -e MYSQL_ROOT_PASSWORD=password \
                  -e MYSQL_DATABASE=mydb \
                  -p 3306:3306 \
                  mysql:8

                echo "Waiting for MySQL startup..."
                sleep 15

                echo "Starting Backend container..."
                docker run -d --name backend \
                  -p 5000:5000 \
                  -e MYSQL_HOST=mysql \
                  --link mysql:mysql \
                  $DOCKER_HUB/$IMAGE_BACKEND:latest

                echo "Starting Frontend container..."
                docker run -d --name frontend \
                  -p 80:80 \
                  $DOCKER_HUB/$IMAGE_FRONTEND:latest

                echo "Deployment completed successfully"
                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful - Stackly E-Commerce Store Updated'
        }
        failure {
            echo 'Deployment Failed - Check Jenkins Logs'
        }
    }
}