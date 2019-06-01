import { InlustrisClient } from '../Client';
import { BaseOptions } from '../interfaces/BaseOptions';
import { BaseRegistry } from '../registries/BaseRegistry';
/**
 * The base class for all pieces.
 * @abstract
 */
export declare abstract class Base {
    readonly client: InlustrisClient;
    readonly options: BaseOptions;
    readonly registry: BaseRegistry<Base, typeof Base>;
    /**
     * Initializes a new Base.
     * @param {InlustrisClient} client The Client for the Base
     * @param {BaseOptions} [options={id:''}] The base options
     */
    constructor(client: InlustrisClient, registry: BaseRegistry<Base, typeof Base>, options?: BaseOptions);
    /**
     * The ID of this base
     * @type {string}
     * @readonly
     */
    readonly id: string;
    /**
     * Whether this base is enabled
     * @type {boolean}
     */
    enabled: boolean;
    /**
     * Enables the base. Shortcut for `<base>.enabled = true`.
     * @returns {Base}
     * @emits InlustrisClient#baseEnabled
     * @chainable
     */
    enable(): this;
    /**
     * Disables the base. Shortcut for `<base>.enabled = false`.
     * @returns {Base}
     * @emits InlustrisClient#baseDisabled
     * @chainable
     */
    disable(): this;
    /**
     * Unloads the base, and deletes it from the registry.
     * @emits InlustrisClient#baseUnloaded
     * @returns {void}
     */
    unload(): void;
}
/**
 * The base options for a module
 * @typedef {Object} BaseOptions
 * @property {string} id The ID of the module
 * @property {boolean} enabled Whether the module should be enabled on startup
 */ 
