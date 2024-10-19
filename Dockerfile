# # Use an official Puppeteer image as the base image
# FROM ghcr.io/puppeteer/puppeteer:latest
# 
# # Set environment variables for Puppeteer
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
# 
# # Set the working directory inside the container
# WORKDIR /usr/src/app
# 
# # Copy the package.json and yarn.lock files to the working directory
# COPY package*.json ./
# 
# # Install dependencies
# RUN yarn
# 
# # Copy the entire project to the working directory
# COPY . .
# 
# # Build the project
# RUN yarn build
# 
# # Specify the command to run your application
# CMD ["node", "./apps/api/dist/index.js"]
# 
FROM ghcr.io/puppeteer/puppeteer:latest

# Create a non-root user
RUN groupadd -r node && useradd -m -r -g node node

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files to the working directory
COPY package*.json ./

# Install dependencies as the non-root user
RUN chown -R node:node /usr/src/app
USER node
RUN yarn

# Switch back to root user for subsequent commands
USER root

# Copy the entire project to the working directory
COPY . .

# Build the project
RUN yarn build

# Specify the command to run your application
CMD ["node", "./apps/api/dist/index.js"]
