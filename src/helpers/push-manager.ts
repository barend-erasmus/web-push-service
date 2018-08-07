export class PushManagerHelper {
  public static publicKeyToApplicationServerKey(publicKey: string): Uint8Array {
    if (!publicKey) {
      throw new Error('Public Key cannot be null');
    }

    const publicKeyBase64: string = PushManagerHelper.publicKeyToBase64(publicKey);

    const publicKeyBase64Decoded: string = PushManagerHelper.decodeBase64(publicKeyBase64);

    const array: Uint8Array = new Uint8Array(publicKeyBase64Decoded.length);

    for (let i = 0; i < publicKeyBase64Decoded.length; ++i) {
      array[i] = publicKeyBase64Decoded.charCodeAt(i);
    }

    return array;
  }

  protected static decodeBase64(base64String: string): string {
    return Buffer.from(base64String, 'base64').toString();
  }

  protected static publicKeyToBase64(publicKey: string): string {
    const padding: string = '='.repeat((4 - (publicKey.length % 4)) % 4);
    const result: string = `${publicKey}${padding}`.replace(/\-/g, '+').replace(/_/g, '/');

    return result;
  }
}
