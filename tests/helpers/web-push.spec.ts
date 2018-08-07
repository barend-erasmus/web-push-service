import { expect } from 'chai';
import { WebPushHelper } from '../../src/helpers/web-push';

describe('WebPushHelper', () => {
  describe('#generateVAPIDKeys', () => {
    it('Should return private key', async () => {
      const result = WebPushHelper.generateVAPIDKeys();

      expect(result.privateKey).to.be.not.null;
    });

    it('Should return public key', async () => {
        const result = WebPushHelper.generateVAPIDKeys();
  
        expect(result.publicKey).to.be.not.null;
      });
  });
});
