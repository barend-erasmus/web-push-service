import { Subscription } from '../models/subscription';

export interface ISubscriptionRepository {
  delete(key: string, endpoint: string): Promise<void>;

  find(key: string, endpoint: string): Promise<Subscription>;

  findAll(key: string, channel: string): Promise<Array<Subscription>>;

  insert(key: string, channel: string, subscription: Subscription): Promise<void>;
}
