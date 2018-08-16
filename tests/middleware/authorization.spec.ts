import { expect } from 'chai';
import * as sinon from 'sinon';
import { AuthorizationMiddleware } from '../../src/middleware/authorization';
import { IClientRepository } from '../../src/interfaces/client-repository';
import { Client } from '../../src/models/client';

describe('AuthorizationMiddleware', () => {
  describe('#apply', () => {
    it('Should call next given key', async () => {
      const clientRepository: IClientRepository = {
        find: sinon.stub().returns(Promise.resolve(new Client(null, null, null, null, null))) as any,
        findByPublicKey: sinon.stub().returns(Promise.resolve(null)) as any,
      } as IClientRepository;

      const fn = AuthorizationMiddleware.build();

      const nextFnSpy: sinon.SinonSpy = sinon.spy();

      await fn({ clientRepository: clientRepository, get: sinon.stub().returns('key') } as any, {} as any, nextFnSpy);

      expect(nextFnSpy.calledOnce).to.be.true;
    });

    it('Should call next given public key', async () => {
      const clientRepository: IClientRepository = {
        find: sinon.stub().returns(Promise.resolve(null)) as any,
        findByPublicKey: sinon.stub().returns(Promise.resolve(new Client(null, null, null, null, null))) as any,
      } as IClientRepository;

      const fn = AuthorizationMiddleware.build();

      const nextFnSpy: sinon.SinonSpy = sinon.spy();

      await fn(
        { clientRepository: clientRepository, get: sinon.stub().returns('publicKey') } as any,
        {} as any,
        nextFnSpy,
      );

      expect(nextFnSpy.calledOnce).to.be.true;
    });

    it('Should not call next given null authorization header', async () => {
      const fn = AuthorizationMiddleware.build();

      const nextFnSpy: sinon.SinonSpy = sinon.spy();

      await fn(
        { get: sinon.stub().returns(null) } as any,
        { status: sinon.stub().returns({ end: sinon.stub() }) } as any,
        nextFnSpy,
      );

      expect(nextFnSpy.calledOnce).to.be.false;
    });

    it('Should not call next given key and public key does not exist', async () => {
        const clientRepository: IClientRepository = {
          find: sinon.stub().returns(Promise.resolve(null)) as any,
          findByPublicKey: sinon.stub().returns(Promise.resolve(null)) as any,
        } as IClientRepository;
  
        const fn = AuthorizationMiddleware.build();
  
        const nextFnSpy: sinon.SinonSpy = sinon.spy();
  
        await fn(
          { clientRepository: clientRepository, get: sinon.stub().returns('keyOrPublicKey') } as any,
          { status: sinon.stub().returns({ end: sinon.stub() }) } as any,
          nextFnSpy,
        );
  
        expect(nextFnSpy.calledOnce).to.be.false;
      });
  });
});
