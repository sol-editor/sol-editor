FROM node:20.15.1 AS builder
WORKDIR /usr/src/app

# Installing dependencies:
COPY package.json package-lock.json ./
RUN npm ci

# Copying configuration:
COPY tsconfig.json ./
# Copying assets:
COPY public/ ./public/
# Copying sources:
COPY src/ ./src/
# Creating dummy .git folder:
RUN git init &&\
    git config user.name "Sol Editor" &&\
    git config user.email "noreply@sol-editor.github.io" &&\
    git add package.json && git commit -m "init"

# Building app:
RUN npm run generateVersion && npm run build

# Using Nginx image to serve static content:
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/data

# Removing default Nginx index page:
RUN rm -r /usr/share/nginx/html/*

# Copying Nginx configuration:
COPY nginx.conf /etc/nginx/

# Copying bundled application from the builder image:
COPY --from=builder /usr/src/app/build/ ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
