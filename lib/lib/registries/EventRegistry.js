"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const List_1 = require("../util/List");
const BaseRegistry_1 = require("./BaseRegistry");
/**
 * The event registry for loading events
 * @extends {BaseRegistry}
 */
class EventRegistry extends BaseRegistry_1.BaseRegistry {
    constructor(client) {
        super(client, 'events', Event_1.Event);
        /**
         * A list of once events, so that events are made to run once
         * @type {List<string>}
         * @private
         */
        this._onceEvents = new List_1.List();
    }
    /**
     * Loads the event, and checks if it's already been ran.
     * @param {string} directory The directory to load from
     * @param {string[]} file The file location of the event
     * @returns {?Event}
     */
    load(directory, file) {
        if (this._onceEvents.has(file[file.length - 1]))
            return null;
        return super.load(directory, file);
    }
    /**
     * Clears the events.
     * @returns {void}
     */
    clear() {
        for (const event of this.values())
            this.delete(event.id);
    }
    /**
     * Unlistens to and deletes an event.
     * @param {string} id The ID of the event
     * @returns {boolean}
     */
    delete(id) {
        const event = this.get(id);
        if (!event)
            return false;
        event._unlisten();
        return super.delete(id);
    }
    /**
     * Adds an event to the registry, and attaches it to an event emitter.
     * @param {Event} base The event to load
     * @returns {?Event}
     */
    add(base) {
        const event = super.add(base);
        if (!event)
            return null;
        event._listen();
        return event;
    }
}
exports.EventRegistry = EventRegistry;
