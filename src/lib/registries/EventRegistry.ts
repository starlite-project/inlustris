import { InlustrisClient } from '../Client';
import { Event } from '../structures/Event';
import { List } from '../util/List';
import { BaseRegistry } from './BaseRegistry';

/**
 * The event registry for loading events
 * @extends {BaseRegistry}
 */
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

    /**
     * Loads the event, and checks if it's already been ran.
     * @param {string} directory The directory to load from
     * @param {string[]} file The file location of the event
     * @returns {?Event}
     */
    public load(directory: string, file: string[]): Event | null {
        if (this._onceEvents.has(file[file.length - 1])) return null;
        return super.load(directory, file);
    }

    /**
     * Clears the events.
     * @returns {void}
     */
    public clear(): void {
        for (const event of this.values()) this.delete(event.id);
    }

    /**
     * Unlistens to and deletes an event.
     * @param {string} id The ID of the event
     * @returns {boolean}
     */
    public delete(id: string): boolean {
        const event = this.get(id);
        if (!event) return false;
        event._unlisten();
        return super.delete(id);
    }

    /**
     * Adds an event to the registry, and attaches it to an event emitter.
     * @param {Event} base The event to load
     * @returns {?Event}
     */
    public add(base: Event): Event | null {
        const event = super.add(base);
        if (!event) return null;
        event._listen();
        return event;
    }
}
