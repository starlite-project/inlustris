import { CategoryChannel, Client, ClientApplication, Collection, DMChannel, GuildMember, NewsChannel, StoreChannel, TextChannel, User, UserResolvable, VoiceChannel } from 'discord.js';
import { InlustrisOptions } from './interfaces/InlustrisOptions';
import { EventRegistry } from './registries/EventRegistry';
import { ClientUtil } from './util/ClientUtil';
import { List } from './util/List';
import { ClientCacheManager } from './storage/ClientCacheManager';
/**
 * The base client for Inlustris.
 * @extends {external:Client}
 */
export declare class InlustrisClient extends Client {
    options: InlustrisOptions;
    private _plugins;
    util: ClientUtil | null;
    private _token;
    [K: string]: any;
    application: ClientApplication | null;
    userBaseDirectory: string;
    readonly events: EventRegistry;
    private registries;
    cache: ClientCacheManager | null;
    /**
     * Creates a new client.
     * @param {InlustrisOptions} [options={}] Options to use when loading the client.
     */
    constructor(options?: InlustrisOptions);
    /**
     * The owners of the client, will only have one until teams support is added
     * @readonly
     * @type {List<external:User>}
     */
    readonly owners: List<User>;
    /**
     * The plugins that will be loaded when the client starts
     * @readonly
     * @type {List<string>}
     */
    readonly plugins: List<string>;
    /**
     * All the text channels the client can see
     * @type {Collection<string, TextChannel>}
     * @readonly
     */
    readonly text: Collection<string, TextChannel>;
    /**
     * All the voice channels the client can see (named this was as Client#voice is the `ClientVoiceManager`)
     * @type {Collection<string, VoiceChannel>}
     * @readonly
     */
    readonly voiceChannels: Collection<string, VoiceChannel>;
    /**
     * All the news channels the client can see
     * @type {Collection<string, NewsChannel>}
     * @readonly
     */
    readonly news: Collection<string, NewsChannel>;
    /**
     * All the store channels the client can see
     * @type {Collection<string, StoreChannel>}
     * @readonly
     */
    readonly store: Collection<string, StoreChannel>;
    /**
     * All the category channels the client can see
     * @type {Collection<string, CategoryChannel>}
     * @readonly
     */
    readonly category: Collection<string, CategoryChannel>;
    /**
     * All the DM channels the client can see
     * @type {Collection<string, DMChannel>}
     * @readonly
     */
    readonly dm: Collection<string, DMChannel>;
    /**
     * A collection of all the `Guild#me` instances, mapped by Guild ID
     * @type {Collection<string, ?GuildMember>}
     * @readonly
     */
    readonly me: Collection<string, GuildMember | null>;
    /**
     * Does the same as [Client#fetchApplication()](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=fetchApplication) but attaches the resolved value to {@link InlustrisClient#application}
     * @returns {Promise<external:ClientApplication>}
     */
    fetchApplication(): Promise<ClientApplication>;
    /**
     * Deprecated method, throws an error on use, use {@link InlustrisClient#start} to start the client
     * @throws {InlustrisError}
     * @deprecated
     */
    login(): never;
    /**
     * Loads and initializes the plugins, and logs the client in.
     * @returns {Promise<string>}
     */
    start(): Promise<string>;
    /**
     * Internal method. Resolves a plugin as internal or external.
     * @param {string} plugin Name of the plugin to resolve
     * @returns {string | InlustrisPlugin}
     * @private
     */
    private _resolvePlugin;
    /**
     * Designates a plugin to load, will be loaded on start.
     * @param {string} mod The name of a plugin to load, will be required if it's external
     * @returns {InlustrisClient}
     */
    use(mod: string): this;
    /**
     * Internal method. Loads an extenral plugin after being required.
     * @param {InlustrisPlugin} plugin The plugin to load
     * @returns {void}
     * @private
     */
    private _loadPlugin;
    /**
     * Checks if the given user is an owner of the bot.
     * @param {external:UserResolvable} user The user to check
     * @returns {boolean}
     */
    isOwner(user: UserResolvable): boolean;
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
