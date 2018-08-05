import { expect } from 'chai';
import { PushService } from '../../src/services/push';
import * as sinon from 'sinon';
import * as webpush from 'web-push';
import { ISubscriptionRepository } from '../../src/interfaces/subscription-repository';
import { Subscription } from '../../src/models/subscription';
import { Client } from '../../src/models/client';

describe('PushService', () => {
  describe('#create', () => {
    it('Should call webpush#sendNotification', async () => {
      const subscriptionRepository: ISubscriptionRepository = {
        findAll: sinon
          .stub()
          .returns(Promise.resolve([new Subscription('endpoint-1', 0, { auth: 'auth-1', p256dh: 'p256dh-1' })])) as any,
      } as ISubscriptionRepository;

      const pushService: PushService = new PushService(subscriptionRepository);

      const webpushSendNotificationSpy: sinon.SinonSpy = sinon.spy();
      (webpush as any).sendNotification = webpushSendNotificationSpy;

      await pushService.create(new Client('key', 'public-key', 'private-key', 'endpoint'), null, null);

      expect(webpushSendNotificationSpy.calledOnce).to.be.true;
    });

    it('Should call webpush#sendNotification with correct parameters', async () => {
        const subscriptionRepository: ISubscriptionRepository = {
          findAll: sinon
            .stub()
            .returns(Promise.resolve([new Subscription('endpoint-1', 0, { auth: 'auth-1', p256dh: 'p256dh-1' })])) as any,
        } as ISubscriptionRepository;
  
        const pushService: PushService = new PushService(subscriptionRepository);
  
        const webpushSendNotificationSpy: sinon.SinonSpy = sinon.spy();
        (webpush as any).sendNotification = webpushSendNotificationSpy;
  
        await pushService.create(new Client('key', 'public-key', 'private-key', 'endpoint'), null, null);

        const subscription: Subscription = webpushSendNotificationSpy.args[0][0];
  
        expect(subscription.endpoint).to.be.eq('endpoint-1');
        expect(subscription.expirationTime).to.be.eq(0);
        expect(subscription.keys.auth).to.be.eq('auth-1');
        expect(subscription.keys.p256dh).to.be.eq('p256dh-1');
      });
  });
});
