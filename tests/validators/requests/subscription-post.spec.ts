import { expect } from 'chai';
import { SubscriptionPostRequestValidator } from '../../../src/validators/requests/subscription-post';

describe('SubscriptionPostRequestValidator', () => {
  describe('#validateBody', () => {
    it('Should return true', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateBody({
        endpoint: 'endpoint',
        expirationTime: 0,
        keys: {
          auth: 'auth',
          p256dh: 'p256dh',
        },
      });

      expect(result).to.be.true;
    });

    it('Should return false given no endpoint', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateBody({
        expirationTime: 0,
        keys: {
          auth: 'auth',
          p256dh: 'p256dh',
        },
      });

      expect(result).to.be.false;
    });

    it('Should return false given no expirationTime', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateBody({
        endpoint: 'endpoint',
        keys: {
          auth: 'auth',
          p256dh: 'p256dh',
        },
      });

      expect(result).to.be.false;
    });

    it('Should return false given no keys', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateBody({
        endpoint: 'endpoint',
        expirationTime: 0,
      });

      expect(result).to.be.false;
    });

    it('Should return false given no auth in keys', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateBody({
        endpoint: 'endpoint',
        expirationTime: 0,
        keys: {
          p256dh: 'p256dh',
        },
      });

      expect(result).to.be.false;
    });

    it('Should return false given no p256dh in keys', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateBody({
        endpoint: 'endpoint',
        expirationTime: 0,
        keys: {
          auth: 'auth',
        },
      });

      expect(result).to.be.false;
    });
  });

  describe('#validateParams', () => {
    it('Should return true', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateParams({
        channel: 'channel',
      });

      expect(result).to.be.true;
    });

    it('Should return false given no channel', async () => {
      const result: boolean = SubscriptionPostRequestValidator.validateParams({
      });

      expect(result).to.be.false;
    });
  });
});
