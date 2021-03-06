import { IClientRepository } from '../interfaces/client-repository';
import { Client } from '../models/client';
import * as NeDB from 'nedb';

export class InMemoryClientRepository implements IClientRepository {
  protected static database: any = null;

  constructor(fileName: string) {
    if (!fileName || !InMemoryClientRepository.database) {
      InMemoryClientRepository.database = new NeDB({
        autoload: true,
        filename: fileName,
      });
    }
  }

  public async find(key: string): Promise<Client> {
    return new Promise((resolve: (client: Client) => void, reject: (error: Error) => void) => {
      InMemoryClientRepository.database.findOne({ key }, (error: Error, document: any) => {
        if (!document) {
          resolve(null);

          return;
        }

        resolve(new Client(document.id, document.key, document.publicKey, document.privateKey, document.endpoint));
      });
    });
  }

  public findById(id: string): Promise<Client> {
    return new Promise((resolve: (client: Client) => void, reject: (error: Error) => void) => {
      InMemoryClientRepository.database.findOne({ id }, (error: Error, document: any) => {
        if (!document) {
          resolve(null);

          return;
        }

        resolve(new Client(document.id, document.key, document.publicKey, document.privateKey, document.endpoint));
      });
    });
  }

  public findByPublicKey(publicKey: string): Promise<Client> {
    return new Promise((resolve: (client: Client) => void, reject: (error: Error) => void) => {
      InMemoryClientRepository.database.findOne({ publicKey }, (error: Error, document: any) => {
        if (!document) {
          resolve(null);

          return;
        }

        resolve(new Client(document.id, document.key, document.publicKey, document.privateKey, document.endpoint));
      });
    });
  }

  public async insert(client: Client): Promise<void> {
    InMemoryClientRepository.database.insert(client);
  }
}
