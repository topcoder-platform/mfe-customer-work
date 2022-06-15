# Use the base image with Node.js
FROM node:10.22.1

ARG APPMODE
ARG APPENV

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV

# Copy the current directory into the Docker image
COPY . /mfe-customer-work

# Set working directory for future use
WORKDIR /mfe-customer-work

# Install the dependencies from package.jso
RUN git config --global url."https://git@".insteadOf git://
RUN npm install

RUN npm run build

CMD npm start
