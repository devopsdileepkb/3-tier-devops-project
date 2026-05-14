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
    }
}