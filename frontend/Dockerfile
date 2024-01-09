# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npm", "run", "start","--host 0.0.0.0"]
