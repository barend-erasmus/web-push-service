import { expect } from 'chai';
import { SubscriptionService } from '../../src/services/subscription';
import * as sinon from 'sinon';
import { ISubscriptionRepository } from '../../src/interfaces/subscription-repository';
import { Subscription } from '../../src/models/subscription';

describe('SubscriptionService', () => {
  describe('#delete', () => {
    it('Should call SubscriptionRepository#delete', async () => {
      const subscriptionRepository: ISubscriptionRepository = {
        delete: sinon.stub() as any,
        find: sinon
          .stub()
          .returns(Promise.resolve(new Subscription('endpoint', 0, { auth: 'auth', p256dh: 'p256dh' }))) as any,
      } as ISubscriptionRepository;

      const subscriptionService: SubscriptionService = new SubscriptionService(subscriptionRepository);

      await subscriptionService.delete('key', 'channel', 'endpoint');

      expect((subscriptionRepository.delete as sinon.SinonSpy).calledOnce).to.be.true;
    });

    it('Should call SubscriptionRepository#delete with correct parameters', async () => {
      const subscriptionRepository: ISubscriptionRepository = {
        delete: sinon.stub() as any,
        find: sinon
          .stub()
          .returns(Promise.resolve(new Subscription('endpoint', 0, { auth: 'auth', p256dh: 'p256dh' }))) as any,
      } as ISubscriptionRepository;

      const subscriptionService: SubscriptionService = new SubscriptionService(subscriptionRepository);

      await subscriptionService.delete('key', 'channel', 'endpoint');

      const key: string = (subscriptionRepository.delete as sinon.SinonSpy).args[0][0];

      const channel: string = (subscriptionRepository.delete as sinon.SinonSpy).args[0][1];

      const endpoint: string = (subscriptionRepository.delete as sinon.SinonSpy).args[0][2];

      expect(key).to.be.eq('key');

      expect(channel).to.be.eq('channel');

      expect(endpoint).to.be.eq('endpoint');
    });

    it('Should not call SubscriptionRepository#delete given subscription does not exist', async () => {
        const subscriptionRepository: ISubscriptionRepository = {
          delete: sinon
          .stub() as any,
          find: sinon
            .stub()
            .returns(Promise.resolve(null)) as any,
        } as ISubscriptionRepository;
  
        const subscriptionService: SubscriptionService = new SubscriptionService(subscriptionRepository);
  
        await subscriptionService.delete('key', 'channel', 'endpoint');
  
        expect((subscriptionRepository.delete as sinon.SinonSpy).notCalled).to.be.true;
      });

    it('Should throw error given null key', async () => {
      const subscriptionService: SubscriptionService = new SubscriptionService(null);

      try {
        await subscriptionService.delete(null, null, null);

        throw new Error('Expected Error');
      } catch (error) {
        expect(error.message).to.be.eq('Key cannot be null');
      }
    });

    it('Should throw error given null channel', async () => {
      const subscriptionService: SubscriptionService = new SubscriptionService(null);

      try {
        await subscriptionService.delete('key', null, null);

        throw new Error('Expected Error');
      } catch (error) {
        expect(error.message).to.be.eq('Channel cannot be null');
      }
    });

    it('Should throw error given null endpoint', async () => {
      const subscriptionService: SubscriptionService = new SubscriptionService(null);

      try {
        await subscriptionService.delete('key', 'channel', null);

        throw new Error('Expected Error');
      } catch (error) {
        expect(error.message).to.be.eq('Endpoint cannot be null');
      }
    });
  });
});
