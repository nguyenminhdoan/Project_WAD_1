# Use Node.js 18 LTS version
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

# Install dependencies with npm (not yarn)
RUN npm install

# Copy the entire project
COPY . .

# Expose the development server port
EXPOSE 5000

# Start the server with nodemon
CMD ["npm", "run", "dev"]