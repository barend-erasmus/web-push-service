import * as express from 'express';
import { IClientRepository } from '../interfaces/client-repository';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import * as webpush from 'web-push';

export class SubscriptionRouter {
  public static async post(request: express.Request, response: express.Response): Promise<void> {
    const clientRepository: IClientRepository = request['clientRepository'];

    const key: string = request.get('authorization');

    if (!(await clientRepository.find(key))) {
      response.status(401).end();
      return;
    }

    const subscriptionRepository: ISubscriptionRepository = request['subscriptionRepository'];

    const channel: string = request.params['channel'];

    const subscription: Subscription = request.body;

    const existingSubscription: Subscription = await subscriptionRepository.find(key, subscription.endpoint);

    if (!existingSubscription) {
      await subscriptionRepository.insert(key, channel, request.body);
    }

    response.json('OK');
  }
}
