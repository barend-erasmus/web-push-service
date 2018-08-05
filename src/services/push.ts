import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import { Client } from '../models/client';
import * as webpush from 'web-push';

export class PushService {
  constructor(protected subscriptionRepository: ISubscriptionRepository) {}

  public async create(client: Client, channel: string, payload: any): Promise<void> {
    if (!client) {
      throw new Error('Client cannot be null');
    }
    
    const subscriptions: Array<Subscription> = await this.subscriptionRepository.findAll(client.key, channel);

    for (const subscription of subscriptions) {
      await this.sendNotification(client, channel, subscription, payload);
    }
  }

  protected async sendNotification(
    client: Client,
    channel: string,
    subscription: Subscription,
    payload: any,
  ): Promise<void> {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload), {
        vapidDetails: {
          subject: client.endpoint,
          publicKey: client.publicKey,
          privateKey: client.privateKey,
        },
        TTL: 604800, // 1 Week
      });
    } catch (error) {
      if (error.statusCode === 410) {
        await this.subscriptionRepository.delete(client.key, channel, subscription.endpoint);
      } else {
        throw error;
      }
    }
  }
}
