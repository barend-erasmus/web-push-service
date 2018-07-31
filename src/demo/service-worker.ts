self.addEventListener('push', (event: any) => {
  const obj: any = JSON.parse(event.data.text());

  const title: string = obj.title;

  const options: any = {
    body: obj.message,
    icon: obj.image,
  };

  event.waitUntil((self as any).registration.showNotification(title, options));
});

