import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';

export class InMemorySubscriptionRepository implements ISubscriptionRepository {
  protected static keys: {} = {};
   
  protected static subscriptions: Array<Subscription> = [];

  public async delete(key: string, endpoint: string): Promise<void> {
    const subscription: Subscription = await this.find(key, endpoint);

    const index: number = InMemorySubscriptionRepository.subscriptions.indexOf(subscription);

    if (index > -1) {
      InMemorySubscriptionRepository.subscriptions.splice(index, 1);
    }
  }

  public async find(key: string, endpoint: string): Promise<Subscription> {
    return InMemorySubscriptionRepository.subscriptions.find(
      (subscription: Subscription) => subscription.endpoint === endpoint,
    );
  }

  public async findAll(key: string, channel: string): Promise<Array<Subscription>> {
    return InMemorySubscriptionRepository.subscriptions;
  }

  public async insert(key: string, channel: string, subscription: Subscription): Promise<void> {
    InMemorySubscriptionRepository.subscriptions.push(subscription);
  }
}
