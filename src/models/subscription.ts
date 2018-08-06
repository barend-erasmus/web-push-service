export class Subscription {
  constructor(public endpoint: string, public expirationTime: number, public keys: { auth: string; p256dh: string }) {}

  public validate(): void {
    if (!this.endpoint) {
      throw new Error('Endpoint cannot be null');
    }

    if (this.expirationTime === null || this.expirationTime === undefined) {
      throw new Error('Expiration Time cannot be null');
    }

    if (!this.keys) {
      throw new Error('Keys cannot be null');
    }
  }
}
