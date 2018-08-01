import * as express from 'express';
import { IClientRepository } from '../interfaces/client-repository';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import * as webpush from 'web-push';
import { Client } from '../models/client';
import { PushPostRequestValidator } from '../validators/requests/push-post';

export class PushRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    if (!PushPostRequestValidator.validateParams(request.params)) {
      response.status(400).json({
        message: `Invalid Request Parameters`,
      });

      return;
    }

    const channel: string = request.params['channel'];

    const payload: any = request.body;

    const clientRepository: IClientRepository = request['clientRepository'];

    const key: string = request.get('authorization');

    const client: Client = await clientRepository.find(key);

    if (!client) {
      response.status(401).end();

      return;
    }

    const subscriptionRepository: ISubscriptionRepository = request['subscriptionRepository'];

    await PushRouter.sendNotification(channel, client, payload, subscriptionRepository);

    response.json('OK');
  }

  protected static async sendNotification(
    channel: string,
    client: Client,
    payload: any,
    subscriptionRepository: ISubscriptionRepository,
  ): Promise<void> {
    const subscriptions: Array<Subscription> = await subscriptionRepository.findAll(key, channel);

    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription, JSON.stringify(payload), {
          vapidDetails: {
            subject: client.endpoint,
            publicKey: client.publicKey,
            privateKey: client.privateKey,
          },
          TTL: 604800, // 1 Week
        });
      } catch (error) {
        if (error.statusCode === 410) {
          await subscriptionRepository.delete(key, channel, subscription.endpoint);
        } else {
          throw error;
        }
      }
    }
  }
}
