import { IClientRepository } from '../interfaces/client-repository';
import { Client } from '../models/client';
import * as uuid from 'uuid';
import { WebPushHelper } from '../helpers/web-push';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';

export class ClientService {
  constructor(
    protected clientRepository: IClientRepository,
    protected subscriptionRepository: ISubscriptionRepository,
  ) {}

  public channels(key: string): Promise<string[]> {
    if (!key) {
      throw new Error('Key cannot be null');
    }

    return this.subscriptionRepository.findChannels(key);
  }

  public async create(endpoint: string): Promise<Client> {
    if (!endpoint) {
      throw new Error('Endpoint cannot be null');
    }

    const client: Client = this.generateNewClient(endpoint);

    await this.clientRepository.insert(client);

    return client;
  }

  // TODO: Unit Test
  public async find(id: string): Promise<Client> {
    if (!id) {
      throw new Error('Id cannot be null');
    }

    const client: Client = await this.clientRepository.findById(id);

    return client;
  }

  protected generateNewClient(endpoint: string): Client {
    const key: string = uuid.v4();

    const vapidKeys: any = WebPushHelper.generateVAPIDKeys();

    const client: Client = new Client(uuid.v4(), key, vapidKeys.publicKey, vapidKeys.privateKey, endpoint);

    return client;
  }
}
