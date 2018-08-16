function publicKeyToApplicationServerKey(publicKey) {
  const publicKeyBase64 = publicKeyToBase64(publicKey);

  const publicKeyBase64Decoded = decodeBase64(publicKeyBase64);

  const array = new Uint8Array(publicKeyBase64Decoded.length);

  for (let i = 0; i < publicKeyBase64Decoded.length; ++i) {
    array[i] = publicKeyBase64Decoded.charCodeAt(i);
  }

  return array;
}

function decodeBase64(base64String) {
  return window.atob(base64String);
}

function publicKeyToBase64(publicKey) {
  const padding = '='.repeat((4 - (publicKey.length % 4)) % 4);
  const result = `${publicKey}${padding}`.replace(/\-/g, '+').replace(/_/g, '/');

  return result;
}

function hasServiceWorkerFunctionality() {
  return 'serviceWorker' in navigator;
}

function hasPushManagerFunctionality() {
  return 'PushManager' in window;
}

function registerServiceWorker() {
  navigator.serviceWorker.register('service-worker.js');
}

async function subscribe(channel, pushSubscription = null) {
  if (!pushSubscription) {
    pushSubscription = await state.serviceWorkerRegistration.pushManager.getSubscription();
  }

  await fetch(`${state.webPushServiceHost}/subscription/${channel}`, {
    body: JSON.stringify(pushSubscription.toJSON()),
    headers: {
      Authorization: state.publicKey,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

async function unsubscribe(channel, pushSubscription = null) {
  if (!pushSubscription) {
    pushSubscription = await state.serviceWorkerRegistration.pushManager.getSubscription();
  }

  await fetch(`${state.webPushServiceHost}/subscription/${channel}`, {
    body: JSON.stringify(pushSubscription.toJSON()),
    headers: {
      Authorization: state.publicKey,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

async function initialize() {
  if (hasServiceWorkerFunctionality() && hasPushManagerFunctionality()) {
    registerServiceWorker();

    state.serviceWorkerRegistration = await navigator.serviceWorker.ready;

    const pushSubscription = await state.serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKeyToApplicationServerKey(state.publicKey),
    });

    await subscribe('default', pushSubscription);
  }
}

const state = {
  publicKey: '<your-public-key-here>',
  serviceWorkerRegistration: null,
  webPushServiceHost: 'https://<your-domain-here>/api/v1',
};

initialize();
