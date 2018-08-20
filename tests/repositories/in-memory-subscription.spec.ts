import { expect } from 'chai';
import { InMemorySubscriptionRepository } from '../../src/repositories/in-memory-subscription';
import { Subscription } from '../../src/models/subscription';

describe('InMemoryClientRepository', () => {
    describe('#delete', () => {
        it('Should delete subscription', async () => {
            const subscriptionRepository: InMemorySubscriptionRepository = new InMemorySubscriptionRepository(null);

            await subscriptionRepository.insert('key', 'channel', new Subscription('endpoint', null, null));

            await subscriptionRepository.delete('key', 'channel', 'endpoint');

            const result: Subscription = await subscriptionRepository.find('key', 'channel', 'endpoint');

            expect(result).to.be.null;
        });
    });

    describe('#find', () => {
        it('Should return subscription', async () => {
            const subscriptionRepository: InMemorySubscriptionRepository = new InMemorySubscriptionRepository(null);

            await subscriptionRepository.insert('key', 'channel', new Subscription('endpoint', null, null));

            const result: Subscription = await subscriptionRepository.find('key', 'channel', 'endpoint');

            expect(result).to.be.not.null;
        });

        it('Should return subscription with correct properties', async () => {
            const subscriptionRepository: InMemorySubscriptionRepository = new InMemorySubscriptionRepository(null);

            await subscriptionRepository.insert('key', 'channel', new Subscription('endpoint', 100, { auth: null, p256dh: null }));

            const result: Subscription = await subscriptionRepository.find('key', 'channel', 'endpoint');

            expect(result).to.be.not.null;
            expect(result.endpoint).to.be.eq('endpoint');
            expect(result.expirationTime).to.be.eq(100);
            expect(result.keys).to.be.not.null;
        });

        it('Should return null given endpoint does not exist', async () => {
            const subscriptionRepository: InMemorySubscriptionRepository = new InMemorySubscriptionRepository(null);

            const result: Subscription = await subscriptionRepository.find('key', 'channel', 'endpoint');

            expect(result).to.be.null;
        });
    });

    describe('#findAll', () => {
        it('Should return subscriptions', async () => {
            const subscriptionRepository: InMemorySubscriptionRepository = new InMemorySubscriptionRepository(null);

            await subscriptionRepository.insert('key', 'channel', new Subscription('endpoint', null, null));
            await subscriptionRepository.insert('key', 'channel', new Subscription('endpoint', null, null));
            await subscriptionRepository.insert('key', 'channel', new Subscription('endpoint', null, null));

            const result: Array<Subscription> = await subscriptionRepository.findAll('key', 'channel');

            expect(result).to.be.not.null;
            expect(result.length).to.be.eq(3);
        });
    });

    describe('#findChannels', () => {
        it('Should return channels', async () => {
            const subscriptionRepository: InMemorySubscriptionRepository = new InMemorySubscriptionRepository(null);

            await subscriptionRepository.insert('key', 'channel1', new Subscription('endpoint', null, null));
            await subscriptionRepository.insert('key', 'channel2', new Subscription('endpoint', null, null));
            await subscriptionRepository.insert('key', 'channel3', new Subscription('endpoint', null, null));

            const result: Array<string> = await subscriptionRepository.findChannels('key');

            expect(result).to.be.not.null;
            expect(result.length).to.be.eq(3);
        });
    });
});
