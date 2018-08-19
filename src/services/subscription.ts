import { Subscription } from '../models/subscription';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';

export class SubscriptionService {
  constructor(protected subscriptionRepository: ISubscriptionRepository) {}

  public async delete(key: string, channel: string, endpoint: string): Promise<void> {
    if (!key) {
      throw new Error('Key cannot be null');
    }

    if (!channel) {
      throw new Error('Channel cannot be null');
    }

    if (!endpoint) {
      throw new Error('Endpoint cannot be null');
    }

    const existingSubscription: Subscription = await this.subscriptionRepository.find(key, channel, endpoint);

    if (existingSubscription) {
      await this.subscriptionRepository.delete(key, channel, existingSubscription.endpoint);
    }
  }

  public async insert(key: string, channel: string, subscription: Subscription): Promise<void> {
    if (!key) {
      throw new Error('Key cannot be null');
    }

    if (!channel) {
      throw new Error('Channel cannot be null');
    }

    if (!subscription) {
      throw new Error('Subscription cannot be null');
    }

    subscription.validate();

    const existingSubscription: Subscription = await this.subscriptionRepository.find(
      key,
      channel,
      subscription.endpoint,
    );

    if (existingSubscription) {
      return;
    }

    await this.subscriptionRepository.insert(key, channel, subscription);
  }
}
