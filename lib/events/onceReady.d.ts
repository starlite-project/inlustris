import { Event, EventRegistry, InlustrisClient } from '../';
export default class extends Event {
    constructor(client: InlustrisClient, registry: EventRegistry);
    run(): Promise<void>;
}
