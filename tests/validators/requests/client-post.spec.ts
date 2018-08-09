import { expect } from 'chai';
import { ClientPostRequestValidator } from '../../../src/validators/requests/client-post';

describe('ClientPostRequestValidator', () => {
  describe('#validateBody', () => {
    it('Should return true', async () => {
      const result: boolean = ClientPostRequestValidator.validateBody({
        endpoint: 'endpoint',
      });

      expect(result).to.be.true;
    });

    it('Should return false given no endpoint', async () => {
      const result: boolean = ClientPostRequestValidator.validateBody({});

      expect(result).to.be.false;
    });
  });
});
