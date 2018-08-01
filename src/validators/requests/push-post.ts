import * as AJV from 'ajv';

export class  PushPostRequestValidator {
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
