import { Client, ClientOptions, ClientApplication, User, UserResolvable } from 'discord.js';
import { InlustrisOptions } from './interfaces/InlustrisOptions';
import { InlustrisPlugin } from './interfaces/InlustrisPlugin';
import { ClientUtil } from './util/ClientUtil';
import { InlustrisError } from './util/InlustrisError';
import { List } from './util/List';
import { Util } from './util/Util';
import { DefaultOptions } from './util/Constants';
import { dirname } from 'path';


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
    public application: ClientApplication | null;
    public userBaseDirectory: string;
    /**
     * Creates a new client.
     * @param {InlustrisOptions} [options={}] Options to use when loading the client.
     */
    public constructor(options: InlustrisOptions = {}) {
        options = Util.mergeDefault<InlustrisOptions>(DefaultOptions, options);
        super(options);

        /**
         * The directory where the user's base files are
         * @type {string}
         */
        this.userBaseDirectory = dirname(require.main!.filename);

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

        /**
         * The application of the client
         * @type {?external:ClientApplication}
         */
        this.application = null;
    }

    /**
     * The owners of the client, will only have one until teams support is added
     * @readonly
     * @type {List<external:User>}
     */
    public get owners(): List<User> {
        const owners = new List<User>();
        for (const owner of this.options.owners!) {
            const user = this.users.get(owner);
            if (user) owners.add(user);
        }
        return owners;
    }

    /**
     * The plugins that will be loaded when the client starts
     * @readonly
     * @type {List<string>}
     */
    public get plugins(): List<string> {
        return this._plugins;
    }

    /**
     * Does the same as [Client#fetchApplication()](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=fetchApplication) but attaches the resolved value to {@link InlustrisClient#application}
     * @returns {Promise<external:ClientApplication>}
     */
    public async fetchApplication(): Promise<ClientApplication> {
        this.application = await super.fetchApplication();
        return this.application;
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
            await this._loadPlugin(resolved);
        }
        return super.login(this._token);
    }

    /**
     * Internal method. Resolves a plugin as internal or external.
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
    private async _loadPlugin(plugin: InlustrisPlugin): Promise<void> {
        try {
            this[plugin.name] = await plugin.loader.call(this);
        } catch (e) {
            throw new InlustrisError('FAILED_TO_LOAD', plugin.name, e);
        }
    }

    /**
     * Checks if the given user is an owner of the bot.
     * @param {external:UserResolvable} user The user to check
     * @returns {boolean}
     */
    public isOwner(user: UserResolvable): boolean {
        const { owners } = this;
        const id = this.users.resolveID(user);
        if (!id) return false;
        for (const owner of owners) {
            if (owner.id === id) return true;
        }
        return false;
    }
}

/**
 * @external UserResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/UserResolvable}
 */

/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */

/**
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */

/**
 * @external ClientApplication
 * @see {@link https://discord.js.org/#/docs/main/master/class/ClientApplication}
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

/**
 * Emitted when a base is enabled.
 * @event InlustrisClient#baseEnabled
 * @param {Base} base The base that was enabled
 */

/**
 * Emitted when a base is disabled.
 * @event InlustrisClient#baseDisabled
 * @param {Base} base The base that was disabled
 */