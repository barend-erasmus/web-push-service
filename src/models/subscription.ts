export class Subscription {
  constructor(
    public endpoint: string,
    public expirationTime: number,
    public keys: { p256dh: string; auth: string },
  ) {}
}
