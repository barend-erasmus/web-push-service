import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import * as mongodb from 'mongodb';

export class MongoSubscriptionRepository implements ISubscriptionRepository {
  protected static client: mongodb.MongoClient = null;

  protected static database: mongodb.Collection = null;

  constructor(protected host: string) {
    if (!MongoSubscriptionRepository.database) {
      this.initialize();
    }
  }

  public close(): void {
    MongoSubscriptionRepository.client.close();
  }

  public async delete(key: string, channel: string, endpoint: string): Promise<void> {
    await MongoSubscriptionRepository.database.remove({ key, channel, 'subscription.endpoint': endpoint });
  }

  public async find(key: string, channel: string, endpoint: string): Promise<Subscription> {
    const document: any = MongoSubscriptionRepository.database.findOne({
      key,
      channel,
      'subscription.endpoint': endpoint,
    });

    return new Subscription(document.subscription.endpoint, document.subscription.expirationTime, {
      auth: document.subscription.keys.auth,
      p256dh: document.subscription.keys.p256dh,
    });
  }

  public async findAll(key: string, channel: string): Promise<Array<Subscription>> {
    const documents: Array<any> = await MongoSubscriptionRepository.database.find({ key, channel }).toArray();

    return documents.map(
      (document: any) =>
        new Subscription(document.subscription.endpoint, document.subscription.expirationTime, {
          auth: document.subscription.keys.auth,
          p256dh: document.subscription.keys.p256dh,
        }),
    );
  }

  public async findChannels(key: string): Promise<Array<string>> {
    const documents: Array<any> = await MongoSubscriptionRepository.database.aggregate([
      {
        $match: {
          key,
        }
      },
      {
        $group: {
          _id: '$channel',
        }
      }
    ]).toArray();

    return documents.map((document: any) => document._id);
  }

  public async insert(key: string, channel: string, subscription: Subscription): Promise<void> {
    await MongoSubscriptionRepository.database.insert({
      channel,
      key,
      subscription,
    });
  }

  public wait(): Promise<void> {
    return new Promise((resolve: () => void) => {
      setTimeout(resolve, 1100);
    });
  }

  protected async initialize(): Promise<void> {
    MongoSubscriptionRepository.client = await mongodb.connect(
      this.host,
      { useNewUrlParser: true },
    );

    const database: mongodb.Db = MongoSubscriptionRepository.client.db('web-push-service');

    MongoSubscriptionRepository.database = database.collection('subcriptions');
  }
}
