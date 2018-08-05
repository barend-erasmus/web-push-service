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
import { PushService } from './services/push';
import { SubscriptionService } from './services/subscription';

export function initialize(
  clientRepository: IClientRepository,
  subscriptionRepository: ISubscriptionRepository,
  host: string,
): express.Application {
  const expressApplication: express.Application = express();

  expressApplication.use('/api/scripts', express.static(path.join(__dirname, 'libraries')));

  expressApplication.use(cors());

  expressApplication.use(bodyParser.json());

  expressApplication.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    request['clientRepository'] = clientRepository;
    request['subscriptionRepository'] = subscriptionRepository;

    request['clientService'] = new ClientService(clientRepository, subscriptionRepository);
    request['pushService'] = new PushService(subscriptionRepository);
    request['subscriptionService'] = new SubscriptionService(subscriptionRepository);

    next();
  });

  expressApplication.route('/api/client').post(ClientRouter.post);

  expressApplication.route('/api/client/channels').get(AuthorizationMiddleware.build(), ClientRouter.channelsGet);

  expressApplication.route('/api/push/:channel').post(AuthorizationMiddleware.build(), PushRouter.post);

  expressApplication
    .route('/api/subscription/:channel/:publicKey')
    .delete(AuthorizationMiddleware.build(), SubscriptionRouter.delete)
    .post(AuthorizationMiddleware.build(), SubscriptionRouter.post);

  const swaggerJson: any = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'swagger.yml')));

  swaggerJson.host = host;

  expressApplication.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJson));

  return expressApplication;
}
