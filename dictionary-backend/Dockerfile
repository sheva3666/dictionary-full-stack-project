# Base image
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Copy your ktor application
COPY ./build/libs/your-ktor-app.jar /app/ktor-app.jar

# Expose the port Ktor runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/ktor-app.jar"]