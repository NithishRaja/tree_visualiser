# Set base image
FROM python:3-slim

# Create root directory for project
RUN mkdir /home/tree-visualiser

# Set workdir
WORKDIR /home/tree-visualiser

# Copy files
COPY ./index.html /home/tree-visualiser
COPY ./index.js /home/tree-visualiser
COPY ./index.css /home/tree-visualiser

# Copy dependency
COPY ./vue3.js /home/tree-visualiser

# Copy readme file
COPY ./README.md /home/tree-visualiser

# Expose port
EXPOSE 8000

# Command to start server
CMD ["python", "-m", "http.server", "8000"]
