import { Event } from '../';

export default class extends Event {
    public constructor(client, registry) {
        super(client, registry, {
            enabled: true,
            once: true,
            event: 'ready',
            id: 'ready'
        });
    }

    public async run(): Promise<void> {
        // Placeholder for now as I work on more features
        this.client.emit('clientReady');
    }
}