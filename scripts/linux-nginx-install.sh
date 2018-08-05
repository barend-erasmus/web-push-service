apt install -y nginx

wget -O /etc/nginx/sites-enabled/web-push-service "https://raw.githubusercontent.com/barend-erasmus/web-push-service/master/scripts/nginx.conf"

sed -i 's/your-domain.com/$1/g' /etc/nginx/sites-enabled/web-push-service

ufw allow 'Nginx Full'

systemctl enable nginx

systemctl restart nginx

