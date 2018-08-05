import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SubscriptionRouter } from './routes/subscription';
import { PushRouter } from './routes/push';
import * as cors from 'cors';
import { ClientRouter } from './routes/client';
import { IClientRepository } from './interfaces/client-repository';
import { ISubscriptionRepository } from './interfaces/subscription-repository';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as swaggerUI from 'swagger-ui-express';
import { AuthorizationMiddleware } from './middleware/authorization';
import * as fs from 'fs';
import { ClientService } from './services/client';

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

    request['clientService'] = new ClientService(clientRepository, subscriptionRepository);
    request['pushService'] = null;
    request['subscriptionService'] = null;

    next();
  });

  expressApplication.route('/api/client').post(ClientRouter.post);

  expressApplication.route('/api/client/channels').get(AuthorizationMiddleware.build(), ClientRouter.channelsGet);

  expressApplication.route('/api/push/:channel').post(PushRouter.post);

  expressApplication
    .route('/api/subscription/:channel/:publicKey')
    .delete(SubscriptionRouter.delete)
    .post(SubscriptionRouter.post);

  expressApplication.use(
    '/',
    swaggerUI.serve,
    swaggerUI.setup(yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'swagger.yml')))),
  );

  return expressApplication;
}
