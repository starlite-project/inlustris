import { InlustrisClient } from '../Client';
import { Event } from '../structures/Event';
import { List } from '../util/List';
import { BaseRegistry } from './BaseRegistry';
/**
 * The event registry for loading events
 * @extends {BaseRegistry}
 */
export declare class EventRegistry extends BaseRegistry<Event, typeof Event> {
    _onceEvents: List<string>;
    constructor(client: InlustrisClient);
    /**
     * Loads the event, and checks if it's already been ran.
     * @param {string} directory The directory to load from
     * @param {string[]} file The file location of the event
     * @returns {?Event}
     */
    load(directory: string, file: string[]): Event | null;
    /**
     * Clears the events.
     * @returns {void}
     */
    clear(): void;
    /**
     * Unlistens to and deletes an event.
     * @param {string} id The ID of the event
     * @returns {boolean}
     */
    delete(id: string): boolean;
    /**
     * Adds an event to the registry, and attaches it to an event emitter.
     * @param {Event} base The event to load
     * @returns {?Event}
     */
    add(base: Event): Event | null;
}
