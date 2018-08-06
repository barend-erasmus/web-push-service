export class Client {
    constructor(public key: string, public publicKey: string, public privateKey: string, public endpoint: string) {
        
    }

    public validate(): void {
        if (!this.key) {
            throw new Error('Key cannot be null');
        }

        if (!this.publicKey) {
            throw new Error('Public Key cannot be null');
        }

        if (!this.privateKey) {
            throw new Error('Private Key cannot be null');
        }

        if (!this.endpoint) {
            throw new Error('Endpoint cannot be null');
        }
    }
}