import * as AJV from 'ajv';

export class ClientPostRequestValidator {
  public static validateBody(obj: any): boolean {
    const schema: any = {
      type: 'object',
      properties: {
        endpoint: { type: 'string' },
      },
      required: ['endpoint'],
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
