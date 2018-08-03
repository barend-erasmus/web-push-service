import { expect } from 'chai';
import { MongoSubscriptionRepository } from '../../src/repositories/mongo-subscription';
import { Subscription } from '../../src/models/subscription';

describe('MongoSubscriptionRepository', () => {
  describe('#findChannels', () => {
    it('Should return channels by key', async () => {
      const subscriptionRepository: MongoSubscriptionRepository = new MongoSubscriptionRepository('mongodb://localhost:27017');

      await subscriptionRepository.wait();

      await subscriptionRepository.insert('key', 'channel-1', new Subscription(null, null, null));
      await subscriptionRepository.insert('key', 'channel-1', new Subscription(null, null, null));

      await subscriptionRepository.insert('key', 'channel-2', new Subscription(null, null, null));
      await subscriptionRepository.insert('key', 'channel-2', new Subscription(null, null, null));

      const result: Array<string> = await subscriptionRepository.findChannels('key');

      expect(result.length).to.be.eq(2);
      expect(result.indexOf('channel-1') > -1).to.be.true;
      expect(result.indexOf('channel-2') > -1).to.be.true;

      subscriptionRepository.close();
    });
  });
});
