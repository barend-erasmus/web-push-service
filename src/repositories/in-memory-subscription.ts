import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import * as NeDB from 'nedb';

export class InMemorySubscriptionRepository implements ISubscriptionRepository {
  protected static database: any = null;

  constructor() {
    if (!InMemorySubscriptionRepository.database) {
      InMemorySubscriptionRepository.database = new NeDB({
        autoload: true,
        filename: './subscriptions',
      });
    }
  }

  public delete(key: string, channel: string, endpoint: string): Promise<void> {
    return new Promise((resolve: () => void, reject: (error: Error) => void) => {
      InMemorySubscriptionRepository.database.remove(
        { key, channel, 'subscription.endpoint': endpoint },
        (error: Error, document: any) => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        },
      );
    });
  }

  public async find(key: string, channel: string, endpoint: string): Promise<Subscription> {
    return new Promise((resolve: (subscription: Subscription) => void, reject: (error: Error) => void) => {
      InMemorySubscriptionRepository.database.findOne(
        { key, channel, 'subscription.endpoint': endpoint },
        (error: Error, document: any) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(document.subscription);
        },
      );
    });
  }

  public findAll(key: string, channel: string): Promise<Array<Subscription>> {
    return new Promise((resolve: (subscriptions: Array<Subscription>) => void, reject: (error: Error) => void) => {
      InMemorySubscriptionRepository.database.find({ key, channel }, (error: Error, documents: Array<any>) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(documents.map((document: any) => document.subscription));
      });
    });
  }

  public async insert(key: string, channel: string, subscription: Subscription): Promise<void> {
    InMemorySubscriptionRepository.database.insert({
      channel,
      key,
      subscription,
    });
  }
}
