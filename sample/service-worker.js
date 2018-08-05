self.addEventListener('push', (event) => {
    const obj = JSON.parse(event.data.text());
  
    const title = obj.title;
  
    const options = {
      body: obj.message,
      data: {
        url: obj.url,
      },
      icon: obj.image,
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    const url = event.notification.data.url;
  
    if (!url) {
        return;
    }
  
    event.waitUntil(self.clients.openWindow(url));
  });
  