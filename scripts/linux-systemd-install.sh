wget -O /lib/systemd/system/web-push-service.service "https://raw.githubusercontent.com/barend-erasmus/web-push-service/master/scripts/web-push-service.service"

systemctl start web-push-service

systemctl enable web-push-service
