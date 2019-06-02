import { Event, EventRegistry, InlustrisClient, Util } from '../';
let retries: number = 0;

export default class extends Event {
    public constructor(client: InlustrisClient, registry: EventRegistry) {
        super(client, registry, {
            enabled: true,
            once: true,
            event: 'ready',
            id: 'ready'
        });
    }

    public async run(): Promise<void> {
        try {
            await this.client.fetchApplication();
        } catch (err) {
            if (++retries === 3) return process.exit();
            this.client.emit('warn', `Unable to fetchApplication at this time, waiting 5 seconds and retrying. Retries left: ${retries - 3}`);
            await Util.sleep(5000);
            return this.run();
        }

        if (!this.client.options.owners!.length) this.client.options.owners!.push(this.client.application!.owner!.id);
        this.client.emit('clientReady');
    }
}
