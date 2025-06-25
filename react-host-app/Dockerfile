# Dockerfile (Development)
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "start"]
