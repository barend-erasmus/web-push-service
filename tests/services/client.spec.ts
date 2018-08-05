import { expect } from 'chai';
import { ClientService } from '../../src/services/client';
import { Subscription } from '../../src/models/subscription';
import { ISubscriptionRepository } from '../../src/interfaces/subscription-repository';
import * as sinon from 'sinon';

describe('ClientService', () => {
  describe('#channels', () => {
    it('Should call SubscriptionRepository#findChannels', async () => {
      const subscriptionRepository: ISubscriptionRepository = {
        findChannels: sinon.spy() as any,
      } as ISubscriptionRepository;

      const clientService: ClientService = new ClientService(null, subscriptionRepository);

      const result: string[] = await clientService.channels('my-key');

      expect((subscriptionRepository.findChannels as sinon.SinonSpy).calledOnce).to.be.true;
    });

    it('Should call SubscriptionRepository#findChannels with correct parameters', async () => {
        const subscriptionRepository: ISubscriptionRepository = {
          findChannels: sinon.spy() as any,
        } as ISubscriptionRepository;
  
        const clientService: ClientService = new ClientService(null, subscriptionRepository);
  
        const result: string[] = await clientService.channels('my-key');
  
        expect((subscriptionRepository.findChannels as sinon.SinonSpy).args[0][0]).to.be.eq('my-key');
      });
  });
});
