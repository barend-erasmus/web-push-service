import * as AJV from 'ajv';

export class SubscriptionPostRequestValidator {
  public static validateBody(obj: any): boolean {
    const schema: any = {
      type: 'object',
      properties: {
        endpoint: { type: 'string' },
        expirationTime: { type: 'number' },
        keys: {
          type: 'object',
          properties: {
            auth: { type: 'string' },
            p256dh: { type: 'string' },
          },
          required: ['auth', 'p256dh'],
        },
      },
      required: ['endpoint', 'expirationTime', 'keys'],
    };

    const ajv = new AJV();

    var validateFn: AJV.ValidateFunction = ajv.compile(schema);

    const valid: boolean | PromiseLike<any> = validateFn(obj);

    if (!valid) {
      return false;
    }

    return true;
  }

  public static validateParams(obj: any): boolean {
    const schema: any = {
      type: 'object',
      properties: {
        channel: { type: 'string' },
      },
      required: ['channel'],
    };

    const ajv = new AJV();

    var validateFn: AJV.ValidateFunction = ajv.compile(schema);

    const valid: boolean | PromiseLike<any> = validateFn(obj);

    if (!valid) {
      return false;
    }

    return true;
  }
}
