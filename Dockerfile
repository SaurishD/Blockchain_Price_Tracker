FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy environment variables and source files
COPY .env.example .env
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]

