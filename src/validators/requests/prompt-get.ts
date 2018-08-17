import * as AJV from 'ajv';

export class PromptGetRequestValidator {
    public static validateQueryParams(obj: any): boolean {
        const schema: any = {
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
            required: ['name'],
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
                id: { type: 'string' },
            },
            required: ['id'],
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
