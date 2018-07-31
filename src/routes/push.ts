import * as express from 'express';
import { IClientRepository } from '../interfaces/client-repository';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import * as webpush from 'web-push';
import { Client } from '../models/client';

export class PushRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    const clientRepository: IClientRepository = request['clientRepository'];

    const key: string = request.get('authorization');

    const client: Client = await clientRepository.find(key);

    if (!client) {
      response.status(401).end();
      return;
    }

    const subscriptionRepository: ISubscriptionRepository = request['subscriptionRepository'];

    const channel: string = request.params['channel'];

    const subscriptions: Array<Subscription> = await subscriptionRepository.findAll(key, channel);

    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, JSON.stringify(request.body), {
          vapidDetails: {
            subject: 'http://localhost:8082/',
            publicKey: client.publicKey,
            privateKey: client.privateKey,
          },
          TTL: 604800, // 1 Week
        });
      } catch(error) {
        if (error.statusCode === 410) {
          await subscriptionRepository.delete(key, subscription.endpoint);
        } else {
          throw error;
        }
      } 
    }

    response.json('OK');
  }
}
