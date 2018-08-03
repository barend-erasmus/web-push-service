import { IClientRepository } from '../interfaces/client-repository';
import { Client } from '../models/client';
import * as mongodb from 'mongodb';

export class MongoClientRepository implements IClientRepository {
  protected static database: mongodb.Collection = null;

  constructor(protected host: string) {
    if (!MongoClientRepository.database) {
      this.initialize();
    }
  }

  public async find(key: string): Promise<Client> {
    const document: any = await MongoClientRepository.database.findOne({ key });

    if (!document) {
      return null;
    }

    return new Client(document.key, document.publicKey, document.privateKey, document.endpoint);
  }

  public async findByPublicKey(publicKey: string): Promise<Client> {
    const document: any = await MongoClientRepository.database.findOne({ publicKey });

    if (!document) {
      return null;
    }

    return new Client(document.key, document.publicKey, document.privateKey, document.endpoint);
  }

  public async insert(client: Client): Promise<void> {
    await MongoClientRepository.database.insert(client);
  }

  protected async initialize(): Promise<void> {
    const client: mongodb.MongoClient = await mongodb.connect(
      this.host,
      { useNewUrlParser: true },
    );

    const database: mongodb.Db = client.db('web-push-service');

    MongoClientRepository.database = database.collection('clients');
  }
}
