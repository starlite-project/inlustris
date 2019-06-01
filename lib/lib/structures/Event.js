"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
/**
 * The event class for creating events.
 * @extends {Base}
 */
class Event extends Base_1.Base {
    constructor(client, registry, options) {
        super(client, registry, options);
        this._listener = this.once ? this._runOnce.bind(this) : this._run.bind(this);
    }
    /**
     * The event this base listens to
     * @type {string}
     * @readonly
     */
    get event() {
        return this.options.event || this.id;
    }
    get emitter() {
        return (typeof this.options.emitter === 'string' ? this.client[this.options.emitter] : this.options.emitter) || this.client;
    }
    /**
     * Enables the event, and adds the listener to the event emitter.
     * @returns {Event}
     * @chainable
     * @emits InlustrisClient#baseEnabled
     */
    enable() {
        this._listen();
        return super.enable();
    }
    /**
     * Disables the event, and removes the listener from the event emitter.
     * @returns {Event}
     * @chainable
     * @emits InlustrisClient#baseDisabled
     */
    disable() {
        this._unlisten();
        return super.disable();
    }
    /**
     * Whether this event is emitted once or not
     * @type {boolean}
     * @readonly
     */
    get once() {
        return Boolean(this.options.once);
    }
    /**
     * The private method to bind to an event emitter.
     * @param {...any} [args] Args emitted to the event
     * @returns {void}
     * @private
     */
    async _run(...args) {
        try {
            await this.run(...args);
        }
        catch (err) {
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
    async _runOnce(...args) {
        await this._run(...args);
        this.registry._onceEvents.add(this.event);
        return this.unload();
    }
    /**
     * Attaches the event to an event emitter.
     * @returns {void}
     * @private
     */
    _listen() {
        this.emitter[this.once ? 'once' : 'on'](this.event, this._listener);
    }
    /**
     * Unlistens to an event, removing the listener from the EventEmitter
     * @returns {void}
     * @private
     */
    _unlisten() {
        this.emitter.removeListener(this.event, this._listener);
    }
}
exports.Event = Event;
