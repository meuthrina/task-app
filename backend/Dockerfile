# FROM node:20 is the base image for the backend service. It provides a Node.js environment for running the application.
# The Dockerfile sets up the working directory, copies the package.json files, installs dependencies, exposes port 8000, and defines the command to run the application in development mode.
FROM node:20

# WORDDIR sets the working directory inside the container to /app. All subsequent commands will be executed in this directory.
WORKDIR /app

# COPY . . copies all files from the current directory on the host machine to the /app directory in the container.
# This includes the source code and configuration files needed for the application to run.
COPY . .

# RUN npm install installs the dependencies defined in the package.json file. This ensures that all required packages are available for the application to run.
RUN npm install

# EXPOSE 8000 exposes port 8000 on the container. This is the port that the application will listen on for incoming requests.
EXPOSE 8000

# CMD ["npm", "run", "dev"] starts the application in development mode.
CMD ["npm", "run", "dev"]