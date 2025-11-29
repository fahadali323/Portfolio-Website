# Use a valid lightweight Alpine-based Nginx image
FROM nginx:1.27-alpine

# Upgrade Alpine packages to patch libpng vulnerabilities
RUN apk update && apk upgrade

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files
COPY app/ /usr/share/nginx/html/

# Expose server port
EXPOSE 80

# Nginx runs automatically: nginx -g 'daemon off;'
