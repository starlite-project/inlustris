import { BaseRegistry } from './BaseRegistry';
import { Event } from '../structures/Event';
import { List } from '../util/List';
import { InlustrisClient } from '../Client';

export class EventRegistry extends BaseRegistry<Event, typeof Event> {
    public _onceEvents: List<string>;

    public constructor(client: InlustrisClient) {
        super(client, 'events', Event);

        /**
         * A list of once events, so that events are made to run once
         * @type {List<string>}
         * @private
         */
        this._onceEvents = new List<string>();
    }

    public load(directory: string, file: string[]): Event | null {
        if (this._onceEvents.has(file[file.length - 1])) return null;
        return super.load(directory, file);
    }

    public clear(): void {
        for (const event of this.values()) this.delete(event.id);
    }

    public delete(id: string): boolean {
        const event = this.get(id);
        if (!event) return false;
        event._unlisten();
        return super.delete(id);
    }

    public add(base: Event): Event | null {
        const event = super.add(base);
        if (!event) return null;
        event._listen();
        return event;
    }
}