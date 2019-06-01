/// <reference types="node" />
import * as Discord from 'discord.js';
import { Stream } from 'stream';
import { InlustrisClient } from '../Client';
import { List } from './List';
/**
 * Utility methods to use for common tasks.
 */
export declare class ClientUtil {
    readonly client: InlustrisClient;
    constructor(client: InlustrisClient);
    /**
     * Resolves a user from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, User>} users Collection of users to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:User}
     */
    resolveUser(text: string, users: Discord.Collection<Discord.Snowflake, Discord.User>, caseSensitive?: boolean, wholeWord?: boolean): Discord.User | undefined;
    /**
     * Resolves multiple users from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, User>} users Collection of users to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, User>}
     */
    resolveUsers(text: string, users: Discord.Collection<Discord.Snowflake, Discord.User>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Collection<Discord.Snowflake, Discord.User>;
    /**
     * Checks if a string could be referring to a user.
     * @param {string} text Text to check
     * @param {external:User} user User to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    checkUser(text: string, user: Discord.User, caseSensitive?: boolean, wholeWord?: boolean): boolean;
    /**
     * Resolves a member from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildMember>} members Collection of members to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:GuildMember}
     */
    resolveMember(text: string, members: Discord.Collection<Discord.Snowflake, Discord.GuildMember>, caseSensitive?: boolean, wholeWord?: boolean): Discord.GuildMember | undefined;
    /**
     * Resolves multiple members from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildMember>} members Collection of members to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, GuildMember>}
     */
    resolveMembers(text: string, members: Discord.Collection<Discord.Snowflake, Discord.GuildMember>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Collection<Discord.Snowflake, Discord.GuildMember>;
    /**
     * Checks if a string could be referring to a member.
     * @param {string} text Text to check
     * @param {external:GuildMember} member Member to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    checkMember(text: string, member: Discord.GuildMember, caseSensitive?: boolean, wholeWord?: boolean): boolean;
    /**
     * Resolves a channel from a string, such as ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildChannel>} channels Collection of channels to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:GuildChannel}
     */
    resolveChannel(text: string, channels: Discord.Collection<Discord.Snowflake, Discord.GuildChannel>, caseSensitive?: boolean, wholeWord?: boolean): Discord.GuildChannel | undefined;
    /**
     * Resolves multiple channels from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildChannel>} channels Collection of channels to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, GuildChannel>}
     */
    resolveChannels(text: string, channels: Discord.Collection<Discord.Snowflake, Discord.GuildChannel>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Collection<Discord.Snowflake, Discord.GuildChannel>;
    /**
     * Checks if a string could be referring to a channel.
     * @param {string} text Text to check
     * @param {external:GuildChannel} channel Channel to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    checkChannel(text: string, channel: Discord.GuildChannel, caseSensitive?: boolean, wholeWord?: boolean): boolean;
    /**
     * Resolves a role from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Role>} roles Collection of roles to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Role}
     */
    resolveRole(text: string, roles: Discord.Collection<Discord.Snowflake, Discord.Role>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Role | undefined;
    /**
     * Resolves multiple roles from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Role>} roles Collection of roles to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, Role>}
     */
    resolveRoles(text: string, roles: Discord.Collection<Discord.Snowflake, Discord.Role>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Collection<Discord.Snowflake, Discord.Role>;
    /**
     * Checks if a string could be referring to a role.
     * @param {string} text Text to check
     * @param {external:Role} role Role to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match full word only
     * @returns {boolean}
     */
    checkRole(text: string, role: Discord.Role, caseSensitive?: boolean, wholeWord?: boolean): boolean;
    /**
     * Resolves a custom emoji from a string, such as a name or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Emoji>} emojis Collection of emojis to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:Emoji}
     */
    resolveEmoji(text: string, emojis: Discord.Collection<Discord.Snowflake, Discord.Emoji>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Emoji | undefined;
    /**
     * Resolves multiple custom emojis from a string, such as a name or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Emoji>} emojis Collection of emojis to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, Emoji>}
     */
    resolveEmojis(text: string, emojis: Discord.Collection<Discord.Snowflake, Discord.Emoji>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Collection<Discord.Snowflake, Discord.Emoji>;
    /**
     * Checks if a string could be referring to an emoji.
     * @param {string} text Text to check
     * @param {external:Emoji} emoji Emoji to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    checkEmoji(text: string, emoji: Discord.Emoji, caseSensitive?: boolean, wholeWord?: boolean): boolean;
    /**
     * Resolves a guild from a string, such as an ID or name.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Guild>} guilds Collection of guilds to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name full word only
     * @returns {external:Guild}
     */
    resolveGuild(text: string, guilds: Discord.Collection<Discord.Snowflake, Discord.Guild>, caseSensitive?: boolean, wholeWord?: boolean): Discord.Guild | undefined;
    /**
     * Resolves multiple guilds from a string, such as an ID or name.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Guild>} guilds Collection of guilds to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name full word only
     * @returns {Collection<Snowflake, Guild>}
     */
    resolveGuilds(text: string, guilds: Discord.Collection<Discord.Snowflake, Discord.Guild>, caseSensitive: boolean | undefined, wholeWord: boolean): Discord.Collection<Discord.Snowflake, Discord.Guild>;
    /**
     * Checks if a string could be referring to a guild.
     * @param {string} text Text to check
     * @param {external:Guild} guild Guild to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match full word only
     * @returns {boolean}
     */
    checkGuild(text: string, guild: Discord.Guild, caseSensitive?: boolean, wholeWord?: boolean): boolean;
    /**
     * An array of permission names.
     * @returns {string[]}
     */
    permissionNames(): string[];
    /**
     * Resolved a permission number and returns an array of permissions names.
     * @param {number} num The permissions number
     * @returns {string[]}
     */
    resolvePermissionNumber(num: number): string[];
    /**
     * Compares two member objects presences and checks if they stopped or started a stream or not.
     * Returns `0`, `1`, or `2` for no change, stopped, or started.
     * @param {external:GuildMember} oldMember The old guild member
     * @param {external:GuildMember} newMember The new guild member
     * @returns {number}
     */
    compareStreaming(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): 0 | 1 | 2;
    /**
     * Combination of `<Client>.fetchUser()` and `<Guild>.fetchMember()`.
     * @param {external:Guild} guild The guild to fetch in
     * @param {string} id ID of the user to fetch
     * @param {boolean} cache Whether or not to add to the cache
     * @returns {Promise<external:GuildMember>}
     */
    fetchMember(guild: Discord.Guild, id: Discord.Snowflake, cache: boolean): Promise<Discord.GuildMember>;
    /**
     * Makes a MessageEmbed.
     * @param {external:MessageEmbed | external:MessageEmbedOptions} [data] The data to use for the embed
     * @returns {external:MessageEmbed}
     */
    embed(data?: Discord.MessageEmbed | Discord.MessageEmbedOptions): Discord.MessageEmbed;
    /**
     * Makes a MessageAttachment.
     * @param {external:BufferResolvable|Stream} file The file
     * @param {string} [name] The name of the file
     * @returns {external:MessageAttachment}
     */
    attachment(file: string | Buffer | Stream, name?: string): Discord.MessageAttachment;
    /**
     * Makes a Collection.
     * @param {Iterable} [iterable] Entries to fill with
     * @returns {external:Collection}
     */
    collection<K, V>(iterable?: readonly (readonly [K, V])[]): Discord.Collection<K, V>;
    /**
     * Makes a List.
     * @param {Iterable} [iterable] Entries to fill with
     * @returns {List}
     */
    list<V>(iterable?: readonly V[]): List<V>;
}
/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection}
 */
/**
 * @external MessageAttachment
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageAttachment}
 */
/**
 * @external BufferResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/BufferResolvable}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external MessageEmbedOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/MessageEmbedOptions}
 */
/**
 * @external GuildMember
 * @see {@link https://discord.js.org/#/docs/main/master/class/GuildMember}
 */
/**
 * @external Guild
 * @see {@link https://discord.js.org/#/docs/main/master/class/Guild}
 */
/**
 * @external Snowflake
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/Snowflake}
 */
/**
 * @external Emoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/Emoji}
 */
/**
 * @external Role
 * @see {@link https://discord.js.org/#/docs/main/master/class/Role}
 */
/**
 * @external GuildChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/GuildChannel}
 */
/**
 * @external User
 * @see {@link https://discord.js.org/#/docs/main/master/class/User}
 */ 
