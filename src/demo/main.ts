const publicKey: string = 'BH7ycnb_eKT4RvqRkbTSMVzCHJHXufNqHqhfuclK_m2OSgec7Uo7gJuryQA6tyxC0kjEVdTShh6i3w1HSRhBj3I';

const endpoint: string = 'http://localhost:8080/subscription/web-push-service-demo';
const key: string = 'd276ae86-ade3-4423-968b-a23a70fc7aa2';

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('service-worker.bundle.js');

    navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicKey),
      });
    })
    .then((pushSubscription: PushSubscription) => {
      return fetch(endpoint, {
        body: JSON.stringify(pushSubscription.toJSON()),
        headers: {
          Authorization: key,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
