import { Base } from './Base';
import { InlustrisClient } from '../Client';
import { EventOptions } from '../interfaces/EventOptions';
import { EventEmitter } from 'events';
import { EventRegistry } from '../registries/EventRegistry';

/**
 * The event class for creating events.
 * @extends {Base}
 */
export abstract class Event extends Base {
    public readonly options: EventOptions;
    public readonly registry: EventRegistry;
    public constructor(client: InlustrisClient, registry: EventRegistry, options: EventOptions) {
        super(client, registry, options);

        this._listener = this.once ? this._runOnce.bind(this) : this._run.bind(this);
    }

    private _listener: { (...args: any[]): void; (...args: any[]): void };

    /**
     * The event this base listens to
     * @type {string}
     * @readonly
     */
    public get event(): string {
        return this.options.event || this.id;
    }

    public get emitter(): EventEmitter {
        return (typeof this.options.emitter === 'string' ? this.client[this.options.emitter] : this.options.emitter) || this.client;
    }

    /**
     * Enables the event, and adds the listener to the event emitter.
     * @returns {Event}
     * @chainable
     * @emits InlustrisClient#baseEnabled
     */
    public enable(): this {
        this._listen();
        return super.enable();
    }

    /**
     * Disables the event, and removes the listener from the event emitter.
     * @returns {Event}
     * @chainable
     * @emits InlustrisClient#baseDisabled
     */
    public disable(): this {
        this._unlisten();
        return super.disable();
    }

    /**
     * Whether this event is emitted once or not
     * @type {boolean}
     * @readonly
     */
    public get once(): boolean {
        return Boolean(this.options.once);
    }

    /**
     * The run method for the event, must be implemented in child classes.
     * @param {...*} args The event's arguments
     * @returns {*}
     * @abstract
     */
    public abstract run(...args: any[]): any;

    /**
     * The private method to bind to an event emitter.
     * @param {...any} [args] Args emitted to the event
     * @returns {void}
     * @private
     */
    private async _run(...args: any[]): Promise<void> {
        try {
            await this.run(...args);
        } catch (err) {
            this.client.emit('eventError', this, args, err);
        }
    }

    /**
     * 
     * The private method to bind to an event emitter, for use once.
     * @param {...any} [args] Args emitted to the event
     * @returns {void}
     * @private
     */
    private async _runOnce(...args: any[]): Promise<void> {
        await this._run(...args);
        this.registry._onceEvents.add(this.event);
        return this.unload();
    }

    /**
     * Attaches the event to an event emitter.
     * @returns {void}
     * @private
     */
    public _listen(): void {
        this.emitter[this.once ? 'once' : 'on'](this.event, this._listener);
    }

    /**
     * Unlistens to an event, removing the listener from the EventEmitter
     * @returns {void}
     * @private
     */
    public _unlisten(): void {
        this.emitter.removeListener(this.event, this._listener);
    }
}