import { expect } from 'chai';
import { PushManagerHelper } from '../../src/helpers/push-manager';

describe('PushManagerHelper', () => {
  describe('#publicKeyToApplicationServerKey', () => {
    it('Should return application server key', async () => {
      const result: Uint8Array = PushManagerHelper.publicKeyToApplicationServerKey('BBqOI20HlYxLMth7sbTk002PMinG7QVRUC12BEZpvq9r1maySNv30MeHxHSYPzKULqhHiSIsFKsdVlc9IJ1NuwE=');

      expect(result.length).to.be.eq(64);
    });

    it('Should throw error given null public key', async () => {
        try {
            PushManagerHelper.publicKeyToApplicationServerKey(null);
    
            throw new Error('Expected Error');
          } catch (error) {
            expect(error.message).to.be.eq('Public Key cannot be null');
          }
      });
  });
});
