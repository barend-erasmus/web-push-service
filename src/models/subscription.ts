export class Subscription {
  constructor(public endpoint: string, public expirationTime: number, public keys: { auth: string; p256dh: string }) {}
}
