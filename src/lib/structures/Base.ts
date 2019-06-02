import { InlustrisClient } from '../Client';
import { BaseOptions } from '../interfaces/BaseOptions';
import { BaseRegistry } from '../registries/BaseRegistry';

/**
 * The base class for all pieces.
 * @abstract
 */
export abstract class Base {
    public readonly client: InlustrisClient;
    public readonly options: BaseOptions;
    public readonly registry: BaseRegistry<Base, typeof Base>;
    /**
     * Initializes a new Base.
     * @param {InlustrisClient} client The Client for the Base
     * @param {BaseOptions} [options={id:''}] The base options
     */
    public constructor(client: InlustrisClient, registry: BaseRegistry<Base, typeof Base>, options: BaseOptions = { id: '', enabled: true }) {
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
    public get id(): string {
        return this.options.id;
    }

    /**
     * Whether this base is enabled
     * @type {boolean}
     */
    public get enabled(): boolean {
        return this.options.enabled!;
    }

    public set enabled(val: boolean) {
        this.enabled = val;
        if (this.client.listenerCount(`base${val ? 'Enabled' : 'Disabled'}`)) this.client.emit(`base${val ? 'Enabled' : 'Disabled'}`, this);
    }

    /**
     * Enables the base. Shortcut for `<base>.enabled = true`.
     * @returns {Base}
     * @emits InlustrisClient#baseEnabled
     * @chainable
     */
    public enable(): this {
        this.enabled = true;
        return this;
    }

    /**
     * Disables the base. Shortcut for `<base>.enabled = false`.
     * @returns {Base}
     * @emits InlustrisClient#baseDisabled
     * @chainable
     */
    public disable(): this {
        this.enabled = false;
        return this;
    }

    /**
     * Unloads the base, and deletes it from the registry.
     * @emits InlustrisClient#baseUnloaded
     * @returns {void}
     */
    public unload(): void {
        if (this.client.listenerCount('baseUnloaded')) this.client.emit('baseUnloaded', this);
        this.registry.delete(this.id);
    }
}

/**
 * The base options for a module
 * @typedef {Object} BaseOptions
 * @property {string} id The ID of the module
 * @property {boolean} enabled Whether the module should be enabled on startup
 */
