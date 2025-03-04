FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install

# Copy environment variables and source files
COPY .env.example .env
COPY . .

# Build the application
RUN yarn build

# Start the application
CMD ["yarn", "start:prod"]
