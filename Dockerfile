# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs ona
EXPOSE 5000

# Start the app
CMD ["node", "dist/server.js"]
