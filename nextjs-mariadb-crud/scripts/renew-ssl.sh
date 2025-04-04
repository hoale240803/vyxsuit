#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/ssl-renewal.log"

# Create log directory if it doesn't exist and set permissions
mkdir -p "$LOG_DIR"
touch "$LOG_FILE"
sudo chown -R ubuntu:ubuntu "$LOG_DIR"
sudo chmod -R 755 "$LOG_DIR"
sudo chmod 644 "$LOG_FILE"

# Log function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" >> "$LOG_FILE"
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1"  # Also print to console
}

log "Starting SSL renewal process..."

# Stop nginx container
log "Stopping Nginx container..."
cd "$PROJECT_DIR" && docker-compose stop nginx 2>/dev/null
if [ $? -ne 0 ]; then
    log "Error: Failed to stop Nginx container"
    exit 1
fi

# Renew certificates
log "Renewing SSL certificates..."
sudo certbot renew --quiet --standalone
if [ $? -ne 0 ]; then
    log "Error: Failed to renew certificates"
    exit 1
fi

# Ensure nginx/ssl directory exists and has correct permissions
sudo mkdir -p "$PROJECT_DIR/nginx/ssl"
sudo chown -R ubuntu:ubuntu "$PROJECT_DIR/nginx/ssl"
sudo chmod -R 755 "$PROJECT_DIR/nginx/ssl"

# Copy renewed certificates
log "Copying renewed certificates..."
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/fullchain.pem "$PROJECT_DIR/nginx/ssl/"
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/privkey.pem "$PROJECT_DIR/nginx/ssl/"
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/chain.pem "$PROJECT_DIR/nginx/ssl/"

if [ $? -ne 0 ]; then
    log "Error: Failed to copy certificates"
    exit 1
fi

# Set correct permissions for certificate files
log "Setting certificate permissions..."
sudo chown -R ubuntu:ubuntu "$PROJECT_DIR/nginx/ssl"
sudo chmod 644 "$PROJECT_DIR/nginx/ssl/"*.pem

# Start nginx container
log "Starting Nginx container..."
cd "$PROJECT_DIR" && docker-compose up -d nginx 2>/dev/null
if [ $? -ne 0 ]; then
    log "Error: Failed to start Nginx container"
    exit 1
fi

log "SSL renewal process completed successfully"