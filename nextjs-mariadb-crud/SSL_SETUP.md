# SSL Setup with Nginx and Let's Encrypt

Quick guide for setting up SSL certificates and auto-renewal.

## Initial Setup

1. Install Certbot:
```bash
sudo apt update && sudo apt install certbot
```

2. Get SSL Certificates:
```bash
# Stop Nginx first
docker-compose stop nginx

# Get certificates
sudo certbot certonly --standalone -d vyxlyfstyles.shop -d www.vyxlyfstyles.shop
```

3. Setup Nginx SSL:
```bash
# Create SSL directory
sudo mkdir -p nginx/ssl
sudo chown -R ubuntu:ubuntu nginx/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/*.pem nginx/ssl/
sudo chmod 644 nginx/ssl/*.pem
```

4. Configure Nginx:
- See [Nginx Configuration](#nginx-configuration) for SSL settings
- Start Nginx: `docker-compose up -d nginx`

## Auto-Renewal

1. Create renewal script (`scripts/renew-ssl.sh`):
```bash
#!/bin/bash
# See [Renewal Script](#renewal-script) for full content
```

2. Make it executable:
```bash
chmod +x scripts/renew-ssl.sh
```

3. Setup cron job:
```bash
# Run every Monday at 2:30 AM
30 2 * * 1 /path/to/your/project/scripts/renew-ssl.sh >> /path/to/your/project/logs/ssl-renewal.log 2>&1
```

## Quick Checks

1. Test renewal:
```bash
./scripts/renew-ssl.sh
```

2. Check certificates:
```bash
sudo certbot certificates
```

## Troubleshooting

Common issues:
- Port 443 in use: `sudo lsof -i :443`
- Missing certificates: `sudo ls -la /etc/letsencrypt/live/vyxlyfstyles.shop/`
- Renewal fails: Check `logs/ssl-renewal.log`

## Important Notes

- Certificates expire every 90 days
- Auto-renewal runs 30 days before expiration
- Monitor renewal logs regularly

## Detailed Sections

- [Nginx Configuration](#nginx-configuration)
- [Renewal Script](#renewal-script)
- [Troubleshooting Guide](#troubleshooting)

## Nginx Configuration

Ensure your Nginx configuration (`nginx/conf.d/default.conf`) includes:
```nginx
server {
    listen 80;
    server_name vyxlyfstyles.shop www.vyxlyfstyles.shop;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name vyxlyfstyles.shop www.vyxlyfstyles.shop;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_trusted_certificate /etc/nginx/ssl/chain.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # HSTS (uncomment if you're sure)
    # add_header Strict-Transport-Security "max-age=63072000" always;

    # Rest of your Nginx configuration...
}
```

## Renewal Script

```bash
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
```

## Troubleshooting

### Common Issues

1. **Port 443 Already in Use**
   ```bash
   sudo lsof -i :443
   sudo systemctl stop apache2  # If Apache is using the port
   ```