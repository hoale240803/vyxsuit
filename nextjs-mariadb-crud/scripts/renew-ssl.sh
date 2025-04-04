#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Stop nginx container
cd "$PROJECT_DIR" && docker-compose -f docker-compose.prod.yml stop nginx

# Renew certificates
sudo certbot renew --quiet --standalone

# Copy renewed certificates
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/fullchain.pem "$PROJECT_DIR/nginx/ssl/"
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/privkey.pem "$PROJECT_DIR/nginx/ssl/"
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/chain.pem "$PROJECT_DIR/nginx/ssl/"

# Set correct permissions
sudo chown -R ubuntu:ubuntu "$PROJECT_DIR/nginx/ssl"
sudo chmod 644 "$PROJECT_DIR/nginx/ssl/"*.pem

# Start nginx container
cd "$PROJECT_DIR" && docker-compose -f docker-compose.prod.yml up -d nginx

# Log the renewal
echo "$(date): SSL certificates renewed successfully" >> /var/log/ssl-renewal.log 