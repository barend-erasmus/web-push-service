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

  await fetch(`${state.webPushServiceHost}/subscription/${channel}/${state.publicKey}`, {
    body: JSON.stringify(pushSubscription.toJSON()),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

async function unsubscribe(channel, pushSubscription = null) {
  if (!pushSubscription) {
    pushSubscription = await state.serviceWorkerRegistration.pushManager.getSubscription();
  }

  await fetch(`${state.webPushServiceHost}/subscription/${channel}/${state.publicKey}`, {
    body: JSON.stringify(pushSubscription.toJSON()),
    headers: {
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
      applicationServerKey: PushManagerHelper.publicKeyToApplicationServerKey(state.publicKey),
    });

    await subscribe('default', pushSubscription);
  }
}

const state = {
  applicationServerKey: '<your-application-server-key-here>',
  publicKey: '<your-public-key-here',
  serviceWorkerRegistration: null,
  webPushServiceHost: 'https://<your-ip-address-of-linux-machine-here>/api',
};

initialize();
