import { initialize } from './server';
import * as commander from 'commander';
import chalk from 'chalk';
import { InMemoryClientRepository } from './repositories/in-memory-client';
import { InMemorySubscriptionRepository } from './repositories/in-memory-subscription';
import { MongoClientRepository } from './repositories/mongo-client';
import { IClientRepository } from './interfaces/client-repository';
import { ISubscriptionRepository } from './interfaces/subscription-repository';
import { MongoSubscriptionRepository } from './repositories/mongo-subscription';

commander
  .command('start')
  .option('-m --mongo <host>', 'Mongo')
  .option('-p --port <port>', 'Port')
  .action((command: any) => {
    if (!command.port) {
      console.log(`${chalk.red('Missing Parameter:')} ${chalk.white('Please provide a port')}`);
      return;
    }

    if (isNaN(command.port)) {
      console.log(`${chalk.red('Invalid Parameter:')} ${chalk.white('Please provide a valid port')}`);
      return;
    }

    let clientRepository: IClientRepository = null;

    let subscriptionRepository: ISubscriptionRepository = null;

    if (command.mongo) {
      clientRepository = new MongoClientRepository(command.mongo);
      subscriptionRepository = new MongoSubscriptionRepository(command.mongo);
    } else {
      clientRepository = new InMemoryClientRepository();
      subscriptionRepository = new InMemorySubscriptionRepository();
    }

    const expressApplication = initialize(clientRepository, subscriptionRepository);

    expressApplication.listen(command.port);

    console.log(chalk.green(`Listening on port ${command.port}`));
  });

commander.parse(process.argv);
