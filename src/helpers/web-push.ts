import * as crypto from 'crypto';

export class WebPushHelper {
  public static generateVAPIDKeys(): { publicKey: string; privateKey: string } {
    const curve: crypto.ECDH = crypto.createECDH('prime256v1');

    curve.generateKeys();

    let publicKeyBuffer: Buffer = curve.getPublicKey();
    let privateKeyBuffer: Buffer = curve.getPrivateKey();

    if (privateKeyBuffer.length < 32) {
      const padding: Buffer = new Buffer(32 - privateKeyBuffer.length);

      padding.fill(0);

      privateKeyBuffer = Buffer.concat([privateKeyBuffer, padding]);
    }

    if (publicKeyBuffer.length < 65) {
      const padding: Buffer = new Buffer(65 - publicKeyBuffer.length);

      padding.fill(0);

      publicKeyBuffer = Buffer.concat([publicKeyBuffer, padding]);
    }

    return {
      publicKey: publicKeyBuffer.toString('base64'),
      privateKey: privateKeyBuffer.toString('base64'),
    };
  }
}
