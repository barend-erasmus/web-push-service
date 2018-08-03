import * as express from 'express';
import { IClientRepository } from '../interfaces/client-repository';
import { ISubscriptionRepository } from '../interfaces/subscription-repository';
import { Subscription } from '../models/subscription';
import { SubscriptionPostRequestValidator } from '../validators/requests/subscription-post';
import { Client } from '../models/client';
import { SubscriptionDeleteRequestValidator } from '../validators/requests/subscription-delete';

export class SubscriptionRouter {
  public static async delete(request: express.Request, response: express.Response): Promise<void> {
    if (!SubscriptionDeleteRequestValidator.validateParams(request.params)) {
      response.status(400).json({
        message: `Invalid Request Parameters`,
      });

      return;
    }

    if (!SubscriptionDeleteRequestValidator.validateBody(request.body)) {
      response.status(400).json({
        message: `Invalid Request Body`,
      });

      return;
    }

    const channel: string = request.params['channel'];

    const publicKey: string = request.params['publicKey'];

    const subscription: Subscription = request.body;

    const clientRepository: IClientRepository = request['clientRepository'];

    const client: Client = await clientRepository.findByPublicKey(publicKey);

    if (!client) {
      response.status(401).end();

      return;
    }

    const subscriptionRepository: ISubscriptionRepository = request['subscriptionRepository'];

    const existingSubscription: Subscription = await subscriptionRepository.find(
      client.key,
      channel,
      subscription.endpoint,
    );

    if (existingSubscription) {
      await subscriptionRepository.delete(client.key, channel, existingSubscription.endpoint);
    }

    response.json('OK');
  }

  public static async post(request: express.Request, response: express.Response): Promise<void> {
    if (!SubscriptionPostRequestValidator.validateParams(request.params)) {
      response.status(400).json({
        message: `Invalid Request Parameters`,
      });

      return;
    }

    if (!SubscriptionPostRequestValidator.validateBody(request.body)) {
      response.status(400).json({
        message: `Invalid Request Body`,
      });

      return;
    }

    const channel: string = request.params['channel'];

    const publicKey: string = request.params['publicKey'];

    const subscription: Subscription = request.body;

    const clientRepository: IClientRepository = request['clientRepository'];

    const client: Client = await clientRepository.findByPublicKey(publicKey);

    if (!client) {
      response.status(401).end();

      return;
    }

    const subscriptionRepository: ISubscriptionRepository = request['subscriptionRepository'];

    const existingSubscription: Subscription = await subscriptionRepository.find(
      client.key,
      channel,
      subscription.endpoint,
    );

    if (!existingSubscription) {
      await subscriptionRepository.insert(client.key, channel, subscription);
    }

    response.json('OK');
  }
}
