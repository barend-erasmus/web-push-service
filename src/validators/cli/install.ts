import * as AJV from 'ajv';

export class InstallCLIValidator {
    public static validate(obj: any): boolean {
        const schema: any = {
            type: 'object',
            properties: {
                host: { type: 'string' },
                mongo: { type: 'string' },
                port: { type: 'string', pattern: '\\d' },
                nginx: { type: 'boolean' },
                letsencrypt: { type: 'boolean' },
            },
            required: ['host', 'port'],
        };

        const ajv = new AJV();

        var validateFn: AJV.ValidateFunction = ajv.compile(schema);

        const valid: boolean | PromiseLike<any> = validateFn(obj);

        if (!valid) {
            return false;
        }

        return true;
    }

    public static errors(obj: any): Array<string> {
        const schema: any = {
            type: 'object',
            properties: {
                host: { type: 'string' },
                mongo: { type: 'string' },
                port: { type: 'string', pattern: '\\d' },
                nginx: { type: 'boolean' },
                letsencrypt: { type: 'boolean' },
            },
            required: ['host', 'port'],
        };

        const ajv = new AJV();

        var validateFn: AJV.ValidateFunction = ajv.compile(schema);

        const valid: boolean | PromiseLike<any> = validateFn(obj);

        if (valid) {
            return null;
        }

        return validateFn.errors.map((x: any) => {
            switch (x.keyword) {
                case 'required':
                    return `Please provide a ${x.params.missingProperty}`;
                case 'pattern':
                    return `Please provide a valid ${x.dataPath.substring(1)}`;
                default:
                    return null;
            }
        });
    }
}
