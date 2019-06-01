"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The base class for all pieces.
 * @abstract
 */
class Base {
    /**
     * Initializes a new Base.
     * @param {InlustrisClient} client The Client for the Base
     * @param {BaseOptions} [options={id:''}] The base options
     */
    constructor(client, registry, options = { id: '', enabled: true }) {
        /**
         * The client that initialized this base
         * @type {InlustrisClient}
         * @name Base#client
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });
        /**
         * The options for this base
         * @type {BaseOptions}
         * @name Base#options
         * @readonly
         */
        Object.defineProperty(this, 'options', { value: options });
        /**
         * The Registry that holds this base
         * @type {BaseStore}
         * @name Base#registry
         * @readonly
         */
        Object.defineProperty(this, 'registry', { value: registry });
    }
    /**
     * The ID of this base
     * @type {string}
     * @readonly
     */
    get id() {
        return this.options.id;
    }
    /**
     * Whether this base is enabled
     * @type {boolean}
     */
    get enabled() {
        return this.options.enabled;
    }
    set enabled(val) {
        this.enabled = val;
        if (this.client.listenerCount(`base${val ? 'Enabled' : 'Disabled'}`))
            this.client.emit(`base${val ? 'Enabled' : 'Disabled'}`, this);
    }
    /**
     * Enables the base. Shortcut for `<base>.enabled = true`.
     * @returns {Base}
     * @emits InlustrisClient#baseEnabled
     * @chainable
     */
    enable() {
        this.enabled = true;
        return this;
    }
    /**
     * Disables the base. Shortcut for `<base>.enabled = false`.
     * @returns {Base}
     * @emits InlustrisClient#baseDisabled
     * @chainable
     */
    disable() {
        this.enabled = false;
        return this;
    }
    /**
     * Unloads the base, and deletes it from the registry.
     * @emits InlustrisClient#baseUnloaded
     * @returns {void}
     */
    unload() {
        if (this.client.listenerCount('baseUnloaded'))
            this.client.emit('baseUnloaded', this);
        this.registry.delete(this.id);
    }
}
exports.Base = Base;
/**
 * The base options for a module
 * @typedef {Object} BaseOptions
 * @property {string} id The ID of the module
 * @property {boolean} enabled Whether the module should be enabled on startup
 */ 
