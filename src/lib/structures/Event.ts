import { Base } from './Base';
import { InlustrisClient } from '../Client';
import { EventOptions } from '../interfaces/EventOptions';
import { EventEmitter } from 'events';
import { EventRegistry } from '../registries/EventRegistry';

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

    public enable(): this {
        this._listen();
        return super.enable();
    }

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

    private async _run(...args: any[]): Promise<void> {
        try {
            await this.run(...args);
        } catch (err) {
            this.client.emit('eventError', this, args, err);
        }
    }

    private async _runOnce(...args: any[]): Promise<void> {
        await this._run(...args);
        this.registry._onceEvents.add(this.event);
        return this.unload();
    }

    public _listen(): void {
        this.emitter[this.once ? 'once' : 'on'](this.event, this._listener);
    }

    public _unlisten(): void {
        this.emitter.removeListener(this.event, this._listener);
    }
}