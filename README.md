# 3 Tier DevOps Project

## Architecture

User → LoadBalancer/Ingress → Frontend → Backend → MySQL

## Tech Stack

- Frontend: React + Nginx
- Backend: Flask
- Database: MySQL
- CI/CD: Jenkins
- Containers: Docker
- Orchestration: Kubernetes

## Deployment

### Local

```bash
docker-compose up --build
```

### Kubernetes

```bash
kubectl apply -f k8s/
```

### Jenkins

Configure pipeline job with Jenkinsfile.

## Troubleshooting

Check pods:

```bash
kubectl get pods -n three-tier
```

Logs:

```bash
kubectl logs <pod-name> -n three-tier
```

Services:

```bash
kubectl get svc -n three-tier
```