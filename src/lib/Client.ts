import { Client, ClientOptions } from 'discord.js';
import { InlustrisOptions } from './interfaces/InlustrisOptions';
import { InlustrisPlugin } from './interfaces/InlustrisPlugin';
import { ClientUtil } from './util/ClientUtil';
import { InlustrisError } from './util/InlustrisError';
import { List } from './util/List';
import { Util } from './util/Util';
import { DefaultOptions } from './util/Constants';


/**
 * The base client for Inlustris.
 * @extends {external:Client}
 */
export class InlustrisClient extends Client {
    public options: InlustrisOptions;
    private _plugins: List<string>;
    public util: ClientUtil | null;
    private _token: string;
    [K: string]: any;
    /**
     * Creates a new client.
     * @param {InlustrisOptions} [options={}] Options to use when loading the client.
     */
    public constructor(options: InlustrisOptions = {}) {
        options = Util.mergeDefault<InlustrisOptions>(DefaultOptions, options);
        super(options);

        /**
         * The plugins to load, kept as a list internally
         * @private
         * @type {List<string>}
         */
        this._plugins = new List([...options.plugins!]);

        /**
         * A {@link ClientUtil} to use, will only be loaded if `internals`, `defaults`, or `util` is specified in {@link InlustrisOptions#plugins} or used with {@link InlustrisClient#use}
         * @type {ClientUtil | null}
         */
        this.util = null;

        /**
         * The token to use to log in, used in the {@link InlustrisClient#start start} method
         * @type {string}
         * @private 
         */
        this._token = options.token!;
    }

    /**
     * Deprecated method, throws an error on use, use {@link InlustrisClient#start} to start the client
     * @throws {InlustrisError}
     * @deprecated
     */
    public login(): never {
        throw new InlustrisError('DEPRECATED_METHOD', 'login', 'start');
    }

    /**
     * Loads and initializes the plugins, and logs the client in.
     * @returns {Promise<string>}
     */
    public async start(): Promise<string> {
        for (const plugin of this._plugins) {
            const resolved = this._resolvePlugin(plugin);
            if (typeof resolved === 'string') continue;
            this._loadPlugin(resolved);
        }
        return super.login(this._token);
    }

    /**
     * Internal method, resolves a plugin as internal or external.
     * @param {string} plugin Name of the plugin to resolve
     * @returns {string | InlustrisPlugin}
     * @private
     */
    private _resolvePlugin(plugin: string): string | InlustrisPlugin {
        switch (plugin) {
            case 'util': {
                this.util = new ClientUtil(this);
                return plugin;
            }
            case 'internals':
            case 'defaults': {
                this._resolvePlugin('util');
                return plugin;
            }
            default: {
                return require(plugin);
            }
        }
    }

    /**
     * Designates a plugin to load, will be loaded on start.
     * @param {string} mod The name of a plugin to load, will be required if it's external
     * @returns {InlustrisClient}
     */
    public use(mod: string): this {
        this._plugins.add(mod);
        return this;
    }

    /**
     * Internal method. Loads an extenral plugin after being required.
     * @param {InlustrisPlugin} plugin The plugin to load
     * @returns {void}
     * @private
     */
    private _loadPlugin(plugin: InlustrisPlugin): void {
        try {
            this[plugin.name] = plugin.loader.call(this);
        } catch (e) {
            throw new InlustrisError('FAILED_TO_LOAD', plugin.name, e);
        }
    }
}


/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */

/**
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */

/**
 * The required export to load an external plugin
 * @typedef {Object} InlustrisPlugin
 * @property {string} name The name of the plugin, this will be what's attached to the client
 * @property {Function} loader The loader function, will be called with the {@link InlustrisClient client} as `this`
 */

/**
 * Options for a new {@link InlustrisClient}
 * @typedef {external:ClientOptions} InlustrisOptions
 * @property {string} [prefix] The prefix to use for commands, can be omitted if the command plugin is disabled
 * @property {string} token The token to use to log the client in
 * @property {Iterable<string>} [plugins] Plugins to load on start, this is the alternate to {@link InlustrisClient#use}
 */