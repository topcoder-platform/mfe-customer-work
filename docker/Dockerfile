# Use the base image with Node.js
FROM node:12.22.12-buster-slim

ARG APPMODE
ARG APPENV

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV

RUN apt update
RUN apt install git -y
# Copy the current directory into the Docker image
COPY . /mfe-customer-work

# Set working directory for future use
WORKDIR /mfe-customer-work

# Install the dependencies from package.json

RUN git config --global url."https://git@".insteadOf git://
RUN npm install

RUN npm run build

CMD node server.js
