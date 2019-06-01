/// <reference types="node" />
import { EventEmitter } from 'events';
import { InlustrisClient } from '../Client';
import { EventOptions } from '../interfaces/EventOptions';
import { EventRegistry } from '../registries/EventRegistry';
import { Base } from './Base';
/**
 * The event class for creating events.
 * @extends {Base}
 */
export declare abstract class Event extends Base {
    readonly options: EventOptions;
    readonly registry: EventRegistry;
    constructor(client: InlustrisClient, registry: EventRegistry, options: EventOptions);
    private _listener;
    /**
     * The event this base listens to
     * @type {string}
     * @readonly
     */
    readonly event: string;
    readonly emitter: EventEmitter;
    /**
     * Enables the event, and adds the listener to the event emitter.
     * @returns {Event}
     * @chainable
     * @emits InlustrisClient#baseEnabled
     */
    enable(): this;
    /**
     * Disables the event, and removes the listener from the event emitter.
     * @returns {Event}
     * @chainable
     * @emits InlustrisClient#baseDisabled
     */
    disable(): this;
    /**
     * Whether this event is emitted once or not
     * @type {boolean}
     * @readonly
     */
    readonly once: boolean;
    /**
     * The run method for the event, must be implemented in child classes.
     * @param {...*} args The event's arguments
     * @returns {*}
     * @abstract
     */
    abstract run(...args: any[]): any;
    /**
     * The private method to bind to an event emitter.
     * @param {...any} [args] Args emitted to the event
     * @returns {void}
     * @private
     */
    private _run;
    /**
     *
     * The private method to bind to an event emitter, for use once.
     * @param {...any} [args] Args emitted to the event
     * @returns {void}
     * @private
     */
    private _runOnce;
    /**
     * Attaches the event to an event emitter.
     * @returns {void}
     * @private
     */
    _listen(): void;
    /**
     * Unlistens to an event, removing the listener from the EventEmitter
     * @returns {void}
     * @private
     */
    _unlisten(): void;
}
