import { expect } from 'chai';
import { ArrayHelper } from '../../src/helpers/array';

describe('ArrayHelper', () => {
  describe('#distinct', () => {
    it('Should return distinct list of items', async () => {
      const result: Array<string> = ArrayHelper.distinct(['a', 'b', 'a', 'b']);

      expect(result.length).to.be.eq(2);
    });

    it('Should throw error given null array', async () => {
        try {
            ArrayHelper.distinct(null);
    
            throw new Error('Expected Error');
          } catch (error) {
            expect(error.message).to.be.eq('Array cannot be null');
          }
      });
  });
});
