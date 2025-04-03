#!/bin/bash

# Exit on error
set -e

# Install required software (only if missing)
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo apt update
    sudo apt install -y docker.io docker-compose
    sudo usermod -aG docker ubuntu
    newgrp docker  # Apply group changes immediately
fi

# Ensure we are in the correct project directory
cd /home/ubuntu/vyxsuit

# Pull latest changes
git pull origin master

# Stop and remove existing containers
docker-compose down

# Rebuild and start containers in detached mode
docker-compose up --build -d
