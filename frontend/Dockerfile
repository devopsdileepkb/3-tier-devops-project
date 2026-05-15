FROM node:18 as build

WORKDIR /app

# Copy package file
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Backend API URL for React build
ARG REACT_APP_API_URL=http://localhost:5000
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build React app
RUN npm run build

# Production stage
FROM nginx:latest

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]