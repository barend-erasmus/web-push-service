import { Subscription } from '../models/subscription';

export interface ISubscriptionRepository {
  delete(key: string, channel: string, endpoint: string): Promise<void>;

  find(key: string, channel: string, endpoint: string): Promise<Subscription>;

  findAll(key: string, channel: string): Promise<Array<Subscription>>;

  findChannels(key: string): Promise<Array<string>>;

  insert(key: string, channel: string, subscription: Subscription): Promise<void>;
}
