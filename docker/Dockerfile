# Use the base image with Node.js
FROM node:10.22.1

ARG APPMODE
ARG APPENV

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV

# Copy the current directory into the Docker image
COPY . /micro-frontends-self-service-app

# Set working directory for future use
WORKDIR /micro-frontends-self-service-app

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
