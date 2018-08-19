import { expect } from 'chai';
import { InMemoryClientRepository } from '../../src/repositories/in-memory-client';
import { Client } from '../../src/models/client';

describe('InMemoryClientRepository', () => {
  describe('#find', () => {
    it('Should return client', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      await clientRepository.insert(new Client(null, 'key', 'publicKey', 'privateKey', 'endpoint'));

      const client: Client = await clientRepository.find('key');

      expect(client).to.be.not.null;
    });

    it('Should return client with correct properties', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      await clientRepository.insert(new Client(null, 'key', 'publicKey', 'privateKey', 'endpoint'));

      const client: Client = await clientRepository.find('key');

      expect(client).to.be.not.null;
      expect(client.endpoint).to.be.eq('endpoint');
      expect(client.key).to.be.eq('key');
      expect(client.privateKey).to.be.eq('privateKey');
      expect(client.publicKey).to.be.eq('publicKey');
    });

    it('Should return null given key does not exist', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      const client: Client = await clientRepository.find('key');

      expect(client).to.be.null;
    });
  });

  describe('#findById', () => {
    it('Should return client', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      await clientRepository.insert(new Client('id', 'key', 'publicKey', 'privateKey', 'endpoint'));

      const client: Client = await clientRepository.findById('id');

      expect(client).to.be.not.null;
    });

    it('Should return client with correct properties', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      await clientRepository.insert(new Client('id', 'key', 'publicKey', 'privateKey', 'endpoint'));

      const client: Client = await clientRepository.findById('id');

      expect(client).to.be.not.null;
      expect(client.endpoint).to.be.eq('endpoint');
      expect(client.key).to.be.eq('key');
      expect(client.privateKey).to.be.eq('privateKey');
      expect(client.publicKey).to.be.eq('publicKey');
    });

    it('Should return null given key does not exist', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      const client: Client = await clientRepository.findById('id');

      expect(client).to.be.null;
    });
  });

  describe('#findByPublicKey', () => {
    it('Should return client', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      await clientRepository.insert(new Client(null, 'key', 'publicKey', 'privateKey', 'endpoint'));

      const client: Client = await clientRepository.findByPublicKey('publicKey');

      expect(client).to.be.not.null;
    });

    it('Should return client with correct properties', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      await clientRepository.insert(new Client(null, 'key', 'publicKey', 'privateKey', 'endpoint'));

      const client: Client = await clientRepository.findByPublicKey('publicKey');

      expect(client).to.be.not.null;
      expect(client.endpoint).to.be.eq('endpoint');
      expect(client.key).to.be.eq('key');
      expect(client.privateKey).to.be.eq('privateKey');
      expect(client.publicKey).to.be.eq('publicKey');
    });

    it('Should return null given key does not exist', async () => {
      const clientRepository: InMemoryClientRepository = new InMemoryClientRepository(null);

      const client: Client = await clientRepository.findByPublicKey('publicKey');

      expect(client).to.be.null;
    });
  });
});
