#!/bin/bash

# Update and install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx

# Enable Docker
sudo systemctl enable --now docker

# Clone the project
git clone https://github.com/hoale240803/vyxsuit.git
cd nextjs-mariadb-crud

# Start Docker containers
sudo docker-compose up -d

# Configure Nginx
sudo tee /etc/nginx/sites-available/nextjs <<EOF
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF

# Enable Nginx config
sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com --non-interactive --agree-tos -m your-email@example.com

echo "🎉 Deployment complete! Access your app at https://https://vyxlyfstyles.shop"
