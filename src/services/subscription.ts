import { Subscription } from '../models/subscription';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';

export class SubscriptionService {
  constructor(protected subscriptionRepository: ISubscriptionRepository) {}

  public async delete(key: string, channel: string, endpoint: string): Promise<void> {
    const existingSubscription: Subscription = await this.subscriptionRepository.find(key, channel, endpoint);

    if (existingSubscription) {
      await this.subscriptionRepository.delete(key, channel, existingSubscription.endpoint);
    }
  }

  public async insert(key: string, channel: string, subscription: Subscription): Promise<void> {
    const existingSubscription: Subscription = await this.subscriptionRepository.find(
      key,
      channel,
      subscription.endpoint,
    );

    if (existingSubscription) {
        return;
    }

    if (!existingSubscription) {
      await this.subscriptionRepository.insert(key, channel, subscription);
    }
  }
}
