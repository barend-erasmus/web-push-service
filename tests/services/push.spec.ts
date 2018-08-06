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
          .returns(Promise.resolve([new Subscription('endpoint', 0, { auth: 'auth', p256dh: 'p256dh' })])) as any,
      } as ISubscriptionRepository;

      const pushService: PushService = new PushService(subscriptionRepository);

      const webpushSendNotificationSpy: sinon.SinonSpy = sinon.spy();
      (webpush as any).sendNotification = webpushSendNotificationSpy;

      await pushService.create(new Client('key', 'public-key', 'private-key', 'endpoint'), 'channel', 'payload');

      expect(webpushSendNotificationSpy.calledOnce).to.be.true;
    });

    it('Should call webpush#sendNotification with correct parameters', async () => {
        const subscriptionRepository: ISubscriptionRepository = {
          findAll: sinon
            .stub()
            .returns(Promise.resolve([new Subscription('endpoint', 0, { auth: 'auth', p256dh: 'p256dh' })])) as any,
        } as ISubscriptionRepository;
  
        const pushService: PushService = new PushService(subscriptionRepository);
  
        const webpushSendNotificationSpy: sinon.SinonSpy = sinon.spy();
        (webpush as any).sendNotification = webpushSendNotificationSpy;
  
        await pushService.create(new Client('key', 'public-key', 'private-key', 'endpoint'), 'channel', 'payload');

        const subscription: Subscription = webpushSendNotificationSpy.args[0][0];

        const payload: string = webpushSendNotificationSpy.args[0][1];

        const options: any = webpushSendNotificationSpy.args[0][2];
  
        expect(subscription.endpoint).to.be.eq('endpoint');
        expect(subscription.expirationTime).to.be.eq(0);
        expect(subscription.keys.auth).to.be.eq('auth');
        expect(subscription.keys.p256dh).to.be.eq('p256dh');

        expect(payload).to.be.eq('"payload"');

        expect(options.vapidDetails.subject).to.be.eq('endpoint');
        expect(options.vapidDetails.publicKey).to.be.eq('public-key');
        expect(options.vapidDetails.privateKey).to.be.eq('private-key');

        expect(options.TTL).to.be.eq(604800);
      });

      it('Should throw error given null client', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(null, null, null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Client cannot be null');
        }
      });

      it('Should throw error given client with null key', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(new Client(null, null, null, null), null, null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Key cannot be null');
        }
      });

      it('Should throw error given client with null public key', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(new Client('key', null, null, null), null, null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Public Key cannot be null');
        }
      });

      it('Should throw error given client with null private key', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(new Client('key', 'public-key', null, null), null, null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Private Key cannot be null');
        }
      });

      it('Should throw error given client with null endpoint', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(new Client('key', 'public-key', 'private-key', null), null, null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Endpoint cannot be null');
        }
      });

      it('Should throw error given null channel', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(new Client('key', 'public-key', 'private-key', 'endpoint'), null, null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Channel cannot be null');
        }
      });

      it('Should throw error given null payload', async () => {  
        const pushService: PushService = new PushService(null);

        try {
          await pushService.create(new Client('key', 'public-key', 'private-key', 'endpoint'), 'channel', null);
  
          throw new Error('Expected Error');
        } catch (error) {
          expect(error.message).to.be.eq('Payload cannot be null');
        }
      });
  });
});
