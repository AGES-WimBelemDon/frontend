# Stage 1: Build the React app
FROM node:22.18.0-alpine AS build
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
COPY .husky/ /app/.husky
RUN npm install --frozen-lockfile

# Copy the rest of the application code and build for production
COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:22.18.0-alpine AS development
WORKDIR /app

# Install dependencies again for development
COPY package.json package-lock.json ./
COPY .husky/ /app/.husky
RUN npm install --frozen-lockfile

# Copy the full source code
COPY . ./

# Expose port for the development server
EXPOSE 5173
CMD ["npm", "run", "dev"]
