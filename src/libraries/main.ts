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

export async function subscribe(channel: string, pushSubscription: PushSubscription = null): Promise<void> {
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

export async function unsubscribe(channel: string, pushSubscription: PushSubscription = null): Promise<void> {
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

const state: any = {
  publicKey: null,
  webPushServiceHost: null,
  serviceWorkerRegistration: null,
};

export async function initialize(publicKey: string, webPushServiceHost: string): Promise<void> {
  state.publicKey = publicKey;
  state.webPushServiceHost = webPushServiceHost;

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
