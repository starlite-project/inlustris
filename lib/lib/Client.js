"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const BaseRegistry_1 = require("./registries/BaseRegistry");
const EventRegistry_1 = require("./registries/EventRegistry");
const ClientUtil_1 = require("./util/ClientUtil");
const Constants_1 = require("./util/Constants");
const InlustrisError_1 = require("./util/InlustrisError");
const List_1 = require("./util/List");
const Util_1 = require("./util/Util");
const ClientCacheManager_1 = require("./storage/ClientCacheManager");
/**
 * The base client for Inlustris.
 * @extends {external:Client}
 */
class InlustrisClient extends discord_js_1.Client {
    /**
     * Creates a new client.
     * @param {InlustrisOptions} [options={}] Options to use when loading the client.
     */
    constructor(options = {}) {
        options = Util_1.Util.mergeDefault(Constants_1.DefaultOptions, options);
        super(options);
        /**
         * The directory where the user's base files are
         * @type {string}
         */
        this.userBaseDirectory = path_1.dirname(require.main.filename);
        /**
         * The plugins to load, kept as a list internally
         * @private
         * @type {List<string>}
         */
        this._plugins = new List_1.List([...options.plugins]);
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
        this._token = options.token;
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
        this.registries = new List_1.List();
        /**
         * The event registry for all the events
         * @type {EventRegistry}
         * @readonly
         */
        this.events = new EventRegistry_1.EventRegistry(this);
        this.registries.add(this.events);
    }
    /**
     * The owners of the client, will only have one until teams support is added
     * @readonly
     * @type {List<external:User>}
     */
    get owners() {
        const owners = new List_1.List();
        for (const owner of this.options.owners) {
            const user = this.users.get(owner);
            if (user)
                owners.add(user);
        }
        return owners;
    }
    /**
     * The plugins that will be loaded when the client starts
     * @readonly
     * @type {List<string>}
     */
    get plugins() {
        return this._plugins;
    }
    /**
     * All the text channels the client can see
     * @type {Collection<string, TextChannel>}
     * @readonly
     */
    get text() {
        return this.channels.filter((chan) => chan.type === 'text');
    }
    /**
     * All the voice channels the client can see (named this was as Client#voice is the `ClientVoiceManager`)
     * @type {Collection<string, VoiceChannel>}
     * @readonly
     */
    get voiceChannels() {
        return this.channels.filter((chan) => chan.type === 'voice');
    }
    /**
     * All the news channels the client can see
     * @type {Collection<string, NewsChannel>}
     * @readonly
     */
    get news() {
        return this.channels.filter((chan) => chan.type === 'news');
    }
    /**
     * All the store channels the client can see
     * @type {Collection<string, StoreChannel>}
     * @readonly
     */
    get store() {
        return this.channels.filter((chan) => chan.type === 'news');
    }
    /**
     * All the category channels the client can see
     * @type {Collection<string, CategoryChannel>}
     * @readonly
     */
    get category() {
        return this.channels.filter((chan) => chan.type === 'category');
    }
    /**
     * All the DM channels the client can see
     * @type {Collection<string, DMChannel>}
     * @readonly
     */
    get dm() {
        return this.channels.filter((chan) => chan.type === 'dm');
    }
    /**
     * A collection of all the `Guild#me` instances, mapped by Guild ID
     * @type {Collection<string, ?GuildMember>}
     * @readonly
     */
    get me() {
        const coll = new discord_js_1.Collection();
        for (const guild of this.guilds.values())
            coll.set(guild.id, guild.me);
        return coll;
    }
    /**
     * Does the same as [Client#fetchApplication()](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=fetchApplication) but attaches the resolved value to {@link InlustrisClient#application}
     * @returns {Promise<external:ClientApplication>}
     */
    async fetchApplication() {
        this.application = await super.fetchApplication();
        return this.application;
    }
    /**
     * Deprecated method, throws an error on use, use {@link InlustrisClient#start} to start the client
     * @throws {InlustrisError}
     * @deprecated
     */
    login() {
        throw new InlustrisError_1.InlustrisError('DEPRECATED_METHOD', 'login', 'start');
    }
    /**
     * Loads and initializes the plugins, and logs the client in.
     * @returns {Promise<string>}
     */
    async start() {
        for (const plugin of this.plugins) {
            const resolved = this._resolvePlugin(plugin);
            if (typeof resolved === 'string')
                continue;
            await this._loadPlugin(resolved);
        }
        const coreDirectory = path_1.join(__dirname, '..', '/');
        for (const registry of this.registries.values())
            registry.registerCoreDirectory(coreDirectory);
        await Promise.all(this.registries.map(async (registry) => `Loaded ${await registry.loadAll()} ${registry.name}`));
        return super.login(this._token);
    }
    /**
     * Internal method. Resolves a plugin as internal or external.
     * @param {string} plugin Name of the plugin to resolve
     * @returns {string | InlustrisPlugin}
     * @private
     */
    _resolvePlugin(plugin) {
        switch (plugin) {
            case 'util': {
                this.util = new ClientUtil_1.ClientUtil(this);
                return plugin;
            }
            case 'settings': {
                this.cache = new ClientCacheManager_1.ClientCacheManager(this);
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
    use(mod) {
        this.plugins.add(mod);
        return this;
    }
    /**
     * Internal method. Loads an extenral plugin after being required.
     * @param {InlustrisPlugin} plugin The plugin to load
     * @returns {void}
     * @private
     */
    async _loadPlugin(plugin) {
        try {
            this[plugin.name] = await plugin.loader.call(this);
            if (this[plugin.name] instanceof BaseRegistry_1.BaseRegistry)
                this.registries.add(this[plugin.name]);
        }
        catch (e) {
            throw new InlustrisError_1.InlustrisError('FAILED_TO_LOAD', plugin.name, e);
        }
    }
    /**
     * Checks if the given user is an owner of the bot.
     * @param {external:UserResolvable} user The user to check
     * @returns {boolean}
     */
    isOwner(user) {
        const { owners } = this;
        const id = this.users.resolveID(user);
        if (!id)
            return false;
        for (const owner of owners) {
            if (owner.id === id)
                return true;
        }
        return false;
    }
}
exports.InlustrisClient = InlustrisClient;
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
