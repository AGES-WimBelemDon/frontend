# Stage 1: Build the React app
FROM node:22.18.0-alpine AS build
WORKDIR /app

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
COPY .husky/ /app/.husky
RUN npm install --frozen-lockfile

# Pass environment variables as build args
ARG VITE_API_URL
ARG VITE_API_VERSION
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

# Copy the rest of the application code and build for production
COPY . ./
RUN npm run build

# Create 404.html fallback for SPA routing
RUN cp dist/index.html dist/404.html

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

# Stage 3: Production with Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html/frontend

# Copy Nginx config (should handle SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
