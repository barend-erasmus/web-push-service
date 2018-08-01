import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SubscriptionRouter } from './routes/subscription';
import { PushRouter } from './routes/push';
import * as cors from 'cors';
import { ClientRouter } from './routes/client';
import { IClientRepository } from './interfaces/client-repository';
import { ISubscriptionRepository } from './interfaces/subscription-repository';

export function initialize(
  clientRepository: IClientRepository,
  subscriptionRepository: ISubscriptionRepository,
): express.Application {
  const expressApplication: express.Application = express();

  expressApplication.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log(`${request.method}: ${request.url}`);

    next();
  });

  expressApplication.use(cors());

  expressApplication.use(bodyParser.json());

  expressApplication.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    request['clientRepository'] = clientRepository;
    request['subscriptionRepository'] = subscriptionRepository;

    next();
  });

  expressApplication.route('/client').post(ClientRouter.post);

  expressApplication.route('/push/:channel').post(PushRouter.post);

  expressApplication
    .route('/subscription/:channel/:publicKey')
    .delete(SubscriptionRouter.post)
    .post(SubscriptionRouter.post);

  return expressApplication;
}
