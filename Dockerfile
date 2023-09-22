# Use the official Node.js 18 image.
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the local code to the container image.
COPY . .

# Build the app
RUN npm run build

# Start the application.
CMD ["npm", "start"]
