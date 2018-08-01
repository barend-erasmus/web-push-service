import { initialize } from './server';
import * as commander from 'commander';
import chalk from 'chalk';
import { InMemoryClientRepository } from './repositories/in-memory-client';
import { InMemorySubscriptionRepository } from './repositories/in-memory-subscription';

commander
  .command('start')
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

    const expressApplication = initialize(new InMemoryClientRepository(), new InMemorySubscriptionRepository());

    expressApplication.listen(command.port);

    console.log(chalk.green(`Listening on port ${command.port}`));
  });

commander.parse(process.argv);
