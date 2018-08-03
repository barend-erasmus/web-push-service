import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SubscriptionRouter } from './routes/subscription';
import { PushRouter } from './routes/push';
import * as cors from 'cors';
import { ClientRouter } from './routes/client';
import { IClientRepository } from './interfaces/client-repository';
import { ISubscriptionRepository } from './interfaces/subscription-repository';
import * as path from 'path';

export function initialize(
  clientRepository: IClientRepository,
  subscriptionRepository: ISubscriptionRepository,
): express.Application {
  const expressApplication: express.Application = express();

  expressApplication.use('/api/scripts', express.static(path.join(__dirname, 'libraries')));

  expressApplication.use(cors());

  expressApplication.use(bodyParser.json());

  expressApplication.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    request['clientRepository'] = clientRepository;
    request['subscriptionRepository'] = subscriptionRepository;

    next();
  });

  expressApplication.route('/api/client').post(ClientRouter.post);

  expressApplication.route('/api/client/channels').get(ClientRouter.channelsGet);

  expressApplication.route('/api/push/:channel').post(PushRouter.post);

  expressApplication
    .route('/api/subscription/:channel/:publicKey')
    .delete(SubscriptionRouter.delete)
    .post(SubscriptionRouter.post);

  return expressApplication;
}
