import { PushManagerHelper } from '../helpers/push-manager';

function hasServiceWorkerFunctionality(): boolean {
  return 'serviceWorker' in navigator;
}

function hasPushManagerFunctionality(): boolean {
  return 'PushManager' in window;
}

function registerServiceWorker(): void {
  navigator.serviceWorker.register('service-worker.bundle.min.js');
}

async function subscribe(channel: string, pushSubscription: PushSubscription = null): Promise<void> {
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

const state: any = {
  publicKey: '',
  webPushServiceHost: 'http://localhost:8080',
  serviceWorkerRegistration: null,
};

export async function initialize(publicKey: string): Promise<void> {
  state.publicKey = publicKey;

  if (hasServiceWorkerFunctionality() && hasPushManagerFunctionality()) {
    registerServiceWorker();

    state.serviceWorkerRegistration = await navigator.serviceWorker.ready;

    const pushSubscription: PushSubscription = await state.serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PushManagerHelper.publicKeyToApplicationServerKey(state.publicKey),
    });

    await subscribe('default', pushSubscription);
  }
}
