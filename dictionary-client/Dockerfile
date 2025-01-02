# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use a different base image to serve the build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# NGINX configuration can go here if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]