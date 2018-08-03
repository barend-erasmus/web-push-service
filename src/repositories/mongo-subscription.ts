import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import * as mongodb from 'mongodb';

export class MongoSubscriptionRepository implements ISubscriptionRepository {
  protected static database: mongodb.Collection = null;

  constructor(protected host: string) {
    if (!MongoSubscriptionRepository.database) {
      this.initialize();
    }
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

  public async insert(key: string, channel: string, subscription: Subscription): Promise<void> {
    await MongoSubscriptionRepository.database.insert({
      channel,
      key,
      subscription,
    });
  }

  protected async initialize(): Promise<void> {
    const client: mongodb.MongoClient = await mongodb.connect(
      this.host,
      { useNewUrlParser: true },
    );

    const database: mongodb.Db = client.db('web-push-service');

    MongoSubscriptionRepository.database = database.collection('subcriptions');
  }
}
