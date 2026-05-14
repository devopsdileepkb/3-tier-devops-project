pipeline {
    agent any

    environment {
        DOCKER_HUB = "dileepkb1718"
        IMAGE_FRONTEND = "frontend"
        IMAGE_BACKEND = "backend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/devopsdileepkb/3-tier-devops-project.git'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $DOCKER_HUB/$IMAGE_FRONTEND:latest ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $DOCKER_HUB/$IMAGE_BACKEND:latest ./backend'
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
                docker rm -f frontend backend || true

                echo "Removing old images..."
                docker rmi $DOCKER_HUB/$IMAGE_FRONTEND:latest || true
                docker rmi $DOCKER_HUB/$IMAGE_BACKEND:latest || true

                echo "Pulling latest images..."
                docker pull $DOCKER_HUB/$IMAGE_FRONTEND:latest
                docker pull $DOCKER_HUB/$IMAGE_BACKEND:latest

                echo "Starting new containers..."
                docker run -d --name backend -p 5000:5000 $DOCKER_HUB/$IMAGE_BACKEND:latest
                docker run -d --name frontend -p 3000:3000 $DOCKER_HUB/$IMAGE_FRONTEND:latest
                '''
            }
        }
    }

    post {
        success {
            echo ' Deployment Successful - Stackly E-Commerce Store App Updated'
        }
        failure {
            echo ' Deployment Failed - Check logs'
        }
    }
}