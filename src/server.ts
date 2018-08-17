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
import * as exphbs from 'express-handlebars';
import { PromptRouter } from './routes/prompt';

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

    request['configuration'] = {
      host,
    };

    next();
  });

  const version1Router: express.Router = express.Router();

  version1Router.route('/client').post(ClientRouter.post);

  version1Router.route('/client/channels').get(AuthorizationMiddleware.build(), ClientRouter.channelsGet);

  version1Router.route('/push/:channel').post(AuthorizationMiddleware.build(), PushRouter.post);

  version1Router
    .route('/subscription/:channel')
    .delete(AuthorizationMiddleware.build(), SubscriptionRouter.delete)
    .post(AuthorizationMiddleware.build(), SubscriptionRouter.post);

  const swaggerJson: any = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', '..', 'swagger.yml')));

  swaggerJson.host = host;

  version1Router.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerJson));

  expressApplication.use('/api/v1', version1Router);

  expressApplication.set('views',  path.join(__dirname, '..', '..', 'public'));
  expressApplication.engine('handlebars', exphbs({ layoutsDir: path.join(__dirname, '..', '..', 'public') }));
  expressApplication.set('view engine', 'handlebars');

  expressApplication.route('/prompt/:id').get(PromptRouter.get);

  expressApplication.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    if (request.url.endsWith('.js')) {
      response.set('Service-Worker-Allowed', '/')
    }

    next();
  });

  expressApplication.use('/static', express.static(path.join(__dirname, '..', '..', 'public')));

  expressApplication.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.redirect('/api/v1/swagger');
  });

  return expressApplication;
}
