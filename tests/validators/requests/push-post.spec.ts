import { expect } from 'chai';
import { PushPostRequestValidator } from '../../../src/validators/requests/push-post';

describe('PushPostRequestValidator', () => {
  describe('#validateBody', () => {
    it('Should return true', async () => {
      const result: boolean = PushPostRequestValidator.validateParams({
        channel: 'channel',
      });

      expect(result).to.be.true;
    });

    it('Should return false given no channel', async () => {
      const result: boolean = PushPostRequestValidator.validateParams({});

      expect(result).to.be.false;
    });
  });
});
