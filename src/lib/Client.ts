import { CategoryChannel, Client, ClientApplication, Collection, DMChannel, GuildMember, NewsChannel, StoreChannel, TextChannel, User, UserResolvable, VoiceChannel } from 'discord.js';
import { dirname, join } from 'path';
import { InlustrisOptions } from './interfaces/InlustrisOptions';
import { InlustrisPlugin } from './interfaces/InlustrisPlugin';
import { BaseRegistry } from './registries/BaseRegistry';
import { EventRegistry } from './registries/EventRegistry';
import { Base } from './structures/Base';
import { ClientUtil } from './util/ClientUtil';
import { DefaultOptions } from './util/Constants';
import { InlustrisError } from './util/InlustrisError';
import { List } from './util/List';
import { Util } from './util/Util';
import { ClientCacheManager } from './storage/ClientCacheManager';


/**
 * The base client for Inlustris.
 * @extends {external:Client}
 */
export class InlustrisClient extends Client {
    public cache: ClientCacheManager | null;

    public readonly events: EventRegistry;

    public loaded: boolean;

    public options: InlustrisOptions;

    public util: ClientUtil | null;

    public application: ClientApplication | null;

    public userBaseDirectory: string;

    private registries: List<BaseRegistry<Base, typeof Base>>;

    private _plugins: List<string>;

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
         * @type {?ClientUtil}
         */
        this.util = null;

        /**
         * The cache manager, will only be loaded if `internals`, `defaults`, or `util` is specified as a plugin to load
         * @type {?ClientCacheManager}
         */
        this.cache = null;

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

        /**
         * Every registry attached to the client, externals will automatically be attached
         * @type {List<BaseRegistry>}
         * @private
         */
        this.registries = new List<BaseRegistry<Base, typeof Base>>();

        /**
         * The event registry for all the events
         * @type {EventRegistry}
         * @readonly
         */
        this.events = new EventRegistry(this);
        this.registries.add(this.events);

        /**
         * Whether the client has loaded all available plugins
         * @type {boolean}
         */
        this.loaded = false;
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
     * All the text channels the client can see
     * @type {Collection<string, TextChannel>}
     * @readonly
     */
    public get text(): Collection<string, TextChannel> {
        return this.channels.filter((chan): boolean => chan.type === 'text') as Collection<string, TextChannel>;
    }

    /**
     * All the voice channels the client can see (named this was as Client#voice is the `ClientVoiceManager`)
     * @type {Collection<string, VoiceChannel>}
     * @readonly
     */
    public get voiceChannels(): Collection<string, VoiceChannel> {
        return this.channels.filter((chan): boolean => chan.type === 'voice') as Collection<string, VoiceChannel>;
    }

    /**
     * All the news channels the client can see
     * @type {Collection<string, NewsChannel>}
     * @readonly
     */
    public get news(): Collection<string, NewsChannel> {
        return this.channels.filter((chan): boolean => chan.type === 'news') as Collection<string, NewsChannel>;
    }

    /**
     * All the store channels the client can see
     * @type {Collection<string, StoreChannel>}
     * @readonly
     */
    public get store(): Collection<string, StoreChannel> {
        return this.channels.filter((chan): boolean => chan.type === 'news') as Collection<string, StoreChannel>;
    }

    /**
     * All the category channels the client can see
     * @type {Collection<string, CategoryChannel>}
     * @readonly
     */
    public get category(): Collection<string, CategoryChannel> {
        return this.channels.filter((chan): boolean => chan.type === 'category') as Collection<string, CategoryChannel>;
    }

    /**
     * All the DM channels the client can see
     * @type {Collection<string, DMChannel>}
     * @readonly
     */
    public get dm(): Collection<string, DMChannel> {
        return this.channels.filter((chan): boolean => chan.type === 'dm') as Collection<string, DMChannel>;
    }

    /**
     * A collection of all the `Guild#me` instances, mapped by Guild ID
     * @type {Collection<string, ?GuildMember>}
     * @readonly
     */
    public get me(): Collection<string, GuildMember | null> {
        const coll: Collection<string, GuildMember | null> = new Collection();
        for (const guild of this.guilds.values()) coll.set(guild.id, guild.me);
        return coll;
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
        await this.load();
        const coreDirectory = join(__dirname, '..', '/');
        for (const registry of this.registries.values()) registry.registerCoreDirectory(coreDirectory);

        await Promise.all(this.registries.map(async (registry): Promise<string> => `Loaded ${await registry.loadAll()} ${registry.name}`));

        return super.login(this._token);
    }

    /**
     * Loads all the plugins called in the options or with `InlustrisClient#use`.
     * @returns {Promise<List<string>>}
     */
    public async load(): Promise<List<string>> {
        const plugs = new List<string>();
        for (const plugin of this.plugins) {
            plugs.add(plugin);
            const resolved = this._resolvePlugin(plugin);
            if (typeof resolved === 'string') continue;
            await this._loadPlugin(resolved);
        }
        this.loaded = true;
        return plugs;
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
            case 'settings': {
                this.cache = new ClientCacheManager(this);
                return plugin;
            }
            case 'internals':
            case 'defaults': {
                this._resolvePlugin('util');
                this._resolvePlugin('settings');
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
        if (this.loaded) throw new InlustrisError('ALREADY_LOADED');
        this.plugins.add(mod);
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
            if (this[plugin.name] instanceof BaseRegistry) this.registries.add(this[plugin.name]);
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

/**
 * Emitted when the client is ready. Should be listened to over `Client#ready`
 * as Inlustris uses that internallly to initialize the client once Discord data
 * is ready.
 * @event InlustrisClient#clientReady
 */

/**
 * Emitted when a base is unloaded.
 * @event InlustrisClient#baseUnloaded
 * @param {Base} base The base that was disabled
 */

/**
 * A list of internal plugins. Calling `internals` or `defaults` as a loaded plugin
 * will load all of them.
 * - `util` adds client utility methods.
 * - `settings` adds settings to the client (WIP).
 * @typedef {string} InternalPlugins
 */
