# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Apollo Server runs on
EXPOSE 4000

# Start the Apollo Server
CMD ["node", "index.js"]