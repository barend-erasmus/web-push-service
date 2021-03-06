import { initialize } from './server';
import * as commander from 'commander';
import chalk from 'chalk';
import { InMemoryClientRepository } from './repositories/in-memory-client';
import { InMemorySubscriptionRepository } from './repositories/in-memory-subscription';
import { MongoClientRepository } from './repositories/mongo-client';
import { IClientRepository } from './interfaces/client-repository';
import { ISubscriptionRepository } from './interfaces/subscription-repository';
import { MongoSubscriptionRepository } from './repositories/mongo-subscription';
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import { InstallCLIValidator } from './validators/cli/install';
import { StartCLIValidator } from './validators/cli/start';

commander
  .command('install')
  .option('-h --host <host>', `defaults to 'your-domain.com'`)
  .option('-m --mongo <host>', 'if not provided, file-based storage will be used')
  .option('-p --port <port>', 'port')
  .option('--nginx', 'install NGINX')
  .option('--letsencrypt', `install and configure Let's Encrypt`)
  .action((command: any) => {
    if (!InstallCLIValidator.validate(command)) {
      for (const error of InstallCLIValidator.errors(command)) {
        console.log(`${chalk.red('ERROR:')} ${chalk.white(error)}`);
      }

      return;
    }

    console.log(chalk.blue(`Creating systemd service file...`));
    fs.writeFileSync(
      '/lib/systemd/system/web-push-service.service',
      `[Unit]
    Description=Web Push Service
    
    [Service]
    Type=simple
    ExecStart=/usr/bin/web-push-service start --host ${command.host ? command.host : 'your-domain.com'}${command.mongo ? `--mongo ${command.mongo}` : ''} --port ${command.port}
    
    [Install]
    WantedBy=multi-user.target`,
    );

    console.log(chalk.blue(`Enabling web-push-service`));
    spawnSync('systemctl', ['enable', 'web-push-service']);

    console.log(chalk.blue(`Starting web-push-service...`));
    spawnSync('systemctl', ['start', 'web-push-service']);

    if (command.letsencrypt) {
      console.log(chalk.blue(`Installing letsencrypt...`));
      spawnSync('apt-get', ['install', '-y', 'letsencrypt']);

      console.log(chalk.blue(`Obtaining Certificate letsencrypt...`));
      spawnSync('letsencrypt', [
        'certonly',
        '--standalone',
        '--agree-tos',
        '--email',
        'developersworkspace@gmail.com',
        '-d',
        command.host,
      ]);
    }

    if (command.nginx) {
      console.log(chalk.blue(`Installing nginx...`));
      spawnSync('apt', ['install', '-y', 'nginx']);

      console.log(chalk.blue(`Creating nginx configuration file...`));
      fs.writeFileSync(
        '/etc/nginx/sites-enabled/web-push-service',
        `upstream web-push-service {
      server 127.0.0.1:8080;
  }
  
  server {
      listen 80;
      server_name ${command.host ? command.host : 'your-domain.com'};
  
      server_tokens off;
      gzip on;
      gzip_min_length 1000;
      gunzip on;
      gzip_static on;
  
      location / {
        proxy_pass http://web-push-service;
      }
  }
  
  server {
      listen 443 ssl;
      server_name ${command.host ? command.host : 'your-domain.com'};
  
      server_tokens off;
      gzip on;
      gzip_min_length 1000;
      gunzip on;
      gzip_static on;
  
      proxy_set_header X-Real-IP $remote_addr;

      ${
        command.letsencrypt
          ? `ssl_certificate /etc/letsencrypt/live/${command.host ? command.host : 'your-domain.com'}/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/${command.host ? command.host : 'your-domain.com'}/privkey.pem;
  
      ssl on;
      ssl_session_cache  builtin:1000  shared:SSL:10m;
      ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
      ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA;
      ssl_prefer_server_ciphers on;`
          : ''
        }
      
  
      location / {
          proxy_pass http://web-push-service;
      }
  }`,
      );

      console.log(chalk.blue(`Configuring firewall...`));
      spawnSync('ufw', ['allow', `'Nginx Full'`]);

      console.log(chalk.blue(`Enabling nginx...`));
      spawnSync('systemctl', ['enable', 'nginx']);

      console.log(chalk.blue(`Starting nginx...`));
      spawnSync('systemctl', ['start', 'nginx']);
    }
  });

commander
  .command('start')
  .option('-h --host <host>', `defaults to 'localhost:8080'`)
  .option('-m --mongo <host>', 'if not provided, file-based storage will be used')
  .option('-p --port <port>', 'port')
  .action((command: any) => {
    if (!StartCLIValidator.validate(command)) {
      for (const error of StartCLIValidator.errors(command)) {
        console.log(`${chalk.red('ERROR:')} ${chalk.white(error)}`);
      }

      return;
    }

    let clientRepository: IClientRepository = null;

    let subscriptionRepository: ISubscriptionRepository = null;

    if (command.mongo) {
      clientRepository = new MongoClientRepository(command.mongo);
      subscriptionRepository = new MongoSubscriptionRepository(command.mongo);
    } else {
      clientRepository = new InMemoryClientRepository('./clients.dat');
      subscriptionRepository = new InMemorySubscriptionRepository('./subscriptions.dat');
    }

    const expressApplication = initialize(
      clientRepository,
      subscriptionRepository,
      command.host ? command.host : 'localhost:8080',
    );

    expressApplication.listen(command.port);

    console.log(chalk.green(`Listening on port ${command.port}`));
  });

commander.parse(process.argv);
