export class SecretDTO {
    private readonly secretKey = null;
    constructor() {
        this.secretKey = 'OX RMS';
    }
    getSecretKey(): string {
        return this.secretKey;
    }
}
