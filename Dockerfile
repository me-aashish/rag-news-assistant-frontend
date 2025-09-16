# Use Node.js 20 alpine as the base image (compatible with Vite's requirements)
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 5173 for Vite dev server (adjust if using a different port)
EXPOSE 3001

# Start the Vite development server
CMD ["npm", "start"]