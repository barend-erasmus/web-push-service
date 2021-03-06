import { expect } from 'chai';
import { ClientService } from '../../src/services/client';
import { ISubscriptionRepository } from '../../src/interfaces/subscription-repository';
import * as sinon from 'sinon';
import { IClientRepository } from '../../src/interfaces/client-repository';
import { Client } from '../../src/models/client';

describe('ClientService', () => {
  describe('#channels', () => {
    it('Should call SubscriptionRepository#findChannels', async () => {
      const subscriptionRepository: ISubscriptionRepository = {
        findChannels: sinon.spy() as any,
      } as ISubscriptionRepository;

      const clientService: ClientService = new ClientService(null, subscriptionRepository);

      await clientService.channels('my-key');

      expect((subscriptionRepository.findChannels as sinon.SinonSpy).calledOnce).to.be.true;
    });

    it('Should call SubscriptionRepository#findChannels with correct parameters', async () => {
      const subscriptionRepository: ISubscriptionRepository = {
        findChannels: sinon.spy() as any,
      } as ISubscriptionRepository;

      const clientService: ClientService = new ClientService(null, subscriptionRepository);

      await clientService.channels('my-key');

      const key: string = (subscriptionRepository.findChannels as sinon.SinonSpy).args[0][0];
      expect(key).to.be.eq('my-key');
    });

    it('Should throw error given null key', async () => {
      const clientService: ClientService = new ClientService(null, null);

      try {
        await clientService.channels(null);

        throw new Error('Expected Error');
      } catch (error) {
        expect(error.message).to.be.eq('Key cannot be null');
      }
    });
  });

  describe('#create', () => {
    it('Should call ClientRepository#insert', async () => {
      const clientRepository: IClientRepository = {
        insert: sinon.spy() as any,
      } as IClientRepository;

      const clientService: ClientService = new ClientService(clientRepository, null);

      await clientService.create('endpoint');

      expect((clientRepository.insert as sinon.SinonSpy).calledOnce).to.be.true;
    });

    it('Should call ClientRepository#insert with correct parameters', async () => {
      const clientRepository: IClientRepository = {
        insert: sinon.spy() as any,
      } as IClientRepository;

      const clientService: ClientService = new ClientService(clientRepository, null);

      await clientService.create('endpoint');

      const client: Client = (clientRepository.insert as sinon.SinonSpy).args[0][0];
      expect(client).to.be.not.null;
      expect(client.endpoint).to.be.eq('endpoint');
      expect(client.key).to.be.not.null;
      expect(client.privateKey).to.be.not.null;
      expect(client.publicKey).to.be.not.null;
    });

    it('Should throw error given null endpoint', async () => {
      const clientService: ClientService = new ClientService(null, null);

      try {
        await clientService.create(null);

        throw new Error('Expected Error');
      } catch (error) {
        expect(error.message).to.be.eq('Endpoint cannot be null');
      }
    });
  });

  describe('#findById', () => {
    it('Should call ClientRepository#findById', async () => {
      const clientRepository: IClientRepository = {
        findById: sinon.spy() as any,
      } as IClientRepository;

      const clientService: ClientService = new ClientService(clientRepository, null);

      await clientService.find('my-id');

      expect((clientRepository.findById as sinon.SinonSpy).calledOnce).to.be.true;
    });

    it('Should call ClientRepository#findById with correct parameters', async () => {
      const clientRepository: IClientRepository = {
        findById: sinon.spy() as any,
      } as IClientRepository;

      const clientService: ClientService = new ClientService(clientRepository, null);

      await clientService.find('my-id');

      const key: string = (clientRepository.findById as sinon.SinonSpy).args[0][0];
      expect(key).to.be.eq('my-id');
    });

    it('Should throw error given null key', async () => {
      const clientService: ClientService = new ClientService(null, null);

      try {
        await clientService.find(null);

        throw new Error('Expected Error');
      } catch (error) {
        expect(error.message).to.be.eq('Id cannot be null');
      }
    });
  });
});
