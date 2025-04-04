# SSL Setup and Auto-Renewal Guide

## Initial SSL Setup

1. **Install Certbot**
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

2. **Stop Nginx Container**
```bash
docker-compose -f docker-compose.prod.yml stop nginx
```

3. **Get SSL Certificates**
```bash
sudo certbot certonly --standalone -d vyxlyfstyles.shop -d www.vyxlyfstyles.shop
```

4. **Copy Certificates to Local Directory**
```bash
# Create SSL directory
mkdir -p nginx/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/privkey.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/chain.pem nginx/ssl/

# Set correct permissions
sudo chown -R ubuntu:ubuntu nginx/ssl
sudo chmod 644 nginx/ssl/*.pem
```

5. **Start Containers**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Auto-Renewal Setup

1. **Create Renewal Script**
```bash
# Create renewal script directory
mkdir -p scripts
touch scripts/renew-ssl.sh
chmod +x scripts/renew-ssl.sh
```

2. **Add Renewal Script Content**
```bash
#!/bin/bash

# Stop nginx container
docker-compose -f docker-compose.prod.yml stop nginx

# Renew certificates
sudo certbot renew --quiet --standalone

# Copy renewed certificates
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/privkey.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/vyxlyfstyles.shop/chain.pem nginx/ssl/

# Set correct permissions
sudo chown -R ubuntu:ubuntu nginx/ssl
sudo chmod 644 nginx/ssl/*.pem

# Start nginx container
docker-compose -f docker-compose.prod.yml up -d nginx
```

3. **Set Up Cron Job**
```bash
# Open crontab
sudo crontab -e

# Add this line to run renewal every Monday at 2:30 AM
30 2 * * 1 /path/to/your/project/scripts/renew-ssl.sh >> /var/log/ssl-renewal.log 2>&1
```

## Verify Auto-Renewal

1. **Test Renewal Process**
```bash
# Test the renewal script
./scripts/renew-ssl.sh

# Check logs
tail -f /var/log/ssl-renewal.log
```

2. **Check Certificate Expiration**
```bash
# Check when certificates expire
sudo certbot certificates
```

## Troubleshooting

1. **If Port 443 is in use**
```bash
# Find process using port 443
sudo lsof -i :443

# Kill the process
sudo kill -9 <PID>
```

2. **If Certificates are not found**
```bash
# Check certificate location
sudo ls -la /etc/letsencrypt/live/vyxlyfstyles.shop/

# Verify permissions
sudo chmod 755 /etc/letsencrypt/live/
sudo chmod 755 /etc/letsencrypt/archive/
```

## Important Notes

1. Certificates expire every 90 days
2. Auto-renewal runs 30 days before expiration
3. Keep the renewal script and cron job in place
4. Monitor renewal logs for any issues
5. Test renewal process periodically

## Docker Compose Configuration

The relevant part of docker-compose.prod.yml:
```yaml
nginx:
  container_name: nginx-server
  image: nginx:latest
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./nginx/conf.d:/etc/nginx/conf.d
    - ./nginx/ssl:/etc/nginx/ssl
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

## Nginx Configuration

The SSL configuration in nginx/conf.d/default.conf:
```nginx
server {
    listen 443 ssl;
    server_name vyxlyfstyles.shop www.vyxlyfstyles.shop;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_trusted_certificate /etc/nginx/ssl/chain.pem;
    # ... rest of the configuration
}
``` 