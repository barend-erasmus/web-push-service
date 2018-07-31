import * as express from 'express';
import { InMemorySubscriptionRepository } from './repositories/in-memory-subscription';
import { InMemoryClientRepository } from './repositories/in-memory-client';
import * as bodyParser from 'body-parser';
import { SubscriptionRouter } from './routes/subscription';
import { AuthenticateRouter } from './routes/authenticate';
import { PushRouter } from './routes/push';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
  request['clientRepository'] = new InMemoryClientRepository();
  request['subscriptionRepository'] = new InMemorySubscriptionRepository();

  next();
});

app.route('/authenticate/key').get(AuthenticateRouter.key);

app.route('/push/:channel').post(PushRouter.post);

app.route('/subscription/:channel').post(SubscriptionRouter.post);

export { app };
