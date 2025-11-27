# Use a lightweight Nginx base image
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entire project content into the Nginx static file directory
# Assuming index.html, frontend.js, resume_data.js, Dockerfile, and nginx.conf are in the root directory
COPY app/ /usr/share/nginx/html/

# The default Nginx port is 80.
EXPOSE 80

# Command to start Nginx is set by the base image (nginx -g 'daemon off;')