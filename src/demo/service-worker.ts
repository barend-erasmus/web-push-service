self.addEventListener('push', (event: any) => {
  const obj: any = JSON.parse(event.data.text());

  const title: string = obj.title;

  const options: any = {
    body: obj.message,
    data: {
      url: obj.url,
    },
    icon: obj.image,
  };

  event.waitUntil((self as any).registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();

  const url: string = event.notification.data.url;

  event.waitUntil(((self as any).clients as any).openWindow(url));
});
