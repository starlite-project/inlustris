// Copyright (c) 2017-2019 1Computer1. All rights reserved. MIT License.

import * as Discord from 'discord.js';
import { Stream } from 'stream';
import { InlustrisClient } from '../Client';
import { List } from './List';

/**
 * Utility methods to use for common tasks.
 */
export class ClientUtil {
    public constructor(public readonly client: InlustrisClient) { }

    /**
     * Resolves a user from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, User>} users Collection of users to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:User}
     */
    public resolveUser(text: string, users: Discord.Collection<Discord.Snowflake, Discord.User>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.User | undefined {
        return users.get(text) || users.find((user): boolean => this.checkUser(text, user, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple users from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, User>} users Collection of users to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, User>}
     */
    public resolveUsers(text: string, users: Discord.Collection<Discord.Snowflake, Discord.User>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Collection<Discord.Snowflake, Discord.User> {
        return users.filter((user): boolean => this.checkUser(text, user, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a user.
     * @param {string} text Text to check
     * @param {external:User} user User to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    public checkUser(text: string, user: Discord.User, caseSensitive: boolean = false, wholeWord: boolean = false): boolean {
        if (user.id === text) return true;

        const reg = /<@!?(\d{17,19})>/;
        const match = text.match(reg);

        if (match && user.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        let { username, discriminator } = user;
        username = caseSensitive ? username : username.toLowerCase();

        if (!wholeWord) {
            return username.includes(text)
                || (username.includes(text.split('#')[0]) && discriminator.includes(text.split('#')[1]));
        }

        return username === text
            || (username === text.split('#')[0] && discriminator === text.split('#')[1]);
    }

    /**
     * Resolves a member from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildMember>} members Collection of members to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:GuildMember}
     */
    public resolveMember(text: string, members: Discord.Collection<Discord.Snowflake, Discord.GuildMember>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.GuildMember | undefined {
        return members.get(text) || members.find((member): boolean => this.checkMember(text, member, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple members from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildMember>} members Collection of members to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, GuildMember>}
     */
    public resolveMembers(text: string, members: Discord.Collection<Discord.Snowflake, Discord.GuildMember>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Collection<Discord.Snowflake, Discord.GuildMember> {
        return members.filter((member): boolean => this.checkMember(text, member, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a member.
     * @param {string} text Text to check
     * @param {external:GuildMember} member Member to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    public checkMember(text: string, member: Discord.GuildMember, caseSensitive: boolean = false, wholeWord: boolean = false): boolean {
        if (member.id === text) return true;

        const reg = /<@!?(\d{17,19})>/;
        const match = text.match(reg);

        if (match && member.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const username = caseSensitive ? member.user.username : member.user.username.toLowerCase();
        const displayName = caseSensitive ? member.displayName : member.displayName.toLowerCase();
        const { discriminator } = member.user;

        if (!wholeWord) {
            return displayName.includes(text)
                || username.includes(text)
                || ((username.includes(text.split('#')[0]) || displayName.includes(text.split('#')[0])) && discriminator.includes(text.split('#')[1]));
        }

        return displayName === text
            || username === text
            || ((username === text.split('#')[0] || displayName === text.split('#')[0]) && discriminator === text.split('#')[1]);
    }

    /**
     * Resolves a channel from a string, such as ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildChannel>} channels Collection of channels to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:GuildChannel}
     */
    public resolveChannel(text: string, channels: Discord.Collection<Discord.Snowflake, Discord.GuildChannel>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.GuildChannel | undefined {
        return channels.get(text) || channels.find((channel): boolean => this.checkChannel(text, channel, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple channels from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, GuildChannel>} channels Collection of channels to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, GuildChannel>}
     */
    public resolveChannels(text: string, channels: Discord.Collection<Discord.Snowflake, Discord.GuildChannel>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Collection<Discord.Snowflake, Discord.GuildChannel> {
        return channels.filter((channel): boolean => this.checkChannel(text, channel, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a channel.
     * @param {string} text Text to check
     * @param {external:GuildChannel} channel Channel to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    public checkChannel(text: string, channel: Discord.GuildChannel, caseSensitive: boolean = false, wholeWord: boolean = false): boolean {
        if (channel.id === text) return true;

        const reg = /<#(\d{17,19})>/;
        const match = text.match(reg);

        if (match && channel.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const name = caseSensitive ? channel.name : channel.name.toLowerCase();

        if (!wholeWord) return name.includes(text) || name.includes(text.replace(/^#/, ''));

        return name === text || name === text.replace(/^#/, '');
    }

    /**
     * Resolves a role from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Role>} roles Collection of roles to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Role}
     */
    public resolveRole(text: string, roles: Discord.Collection<Discord.Snowflake, Discord.Role>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Role | undefined {
        return roles.get(text) || roles.find((role): boolean => this.checkRole(text, role, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple roles from a string, such as an ID, a name, or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Role>} roles Collection of roles to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, Role>}
     */
    public resolveRoles(text: string, roles: Discord.Collection<Discord.Snowflake, Discord.Role>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Collection<Discord.Snowflake, Discord.Role> {
        return roles.filter((role): boolean => this.checkRole(text, role, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a role.
     * @param {string} text Text to check
     * @param {external:Role} role Role to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match full word only
     * @returns {boolean}
     */
    public checkRole(text: string, role: Discord.Role, caseSensitive: boolean = false, wholeWord: boolean = false): boolean {
        if (role.id === text) return true;

        const reg = /<@&(\d{17,19})>/;
        const match = text.match(reg);

        if (match && role.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        const name = caseSensitive ? role.name : role.name.toLowerCase();

        if (!wholeWord) return name.includes(text) || name.includes(text.replace(/^@/, ''));
        return name === text || name === text.replace(/^@/, '');
    }

    /**
     * Resolves a custom emoji from a string, such as a name or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Emoji>} emojis Collection of emojis to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {external:Emoji}
     */
    public resolveEmoji(text: string, emojis: Discord.Collection<Discord.Snowflake, Discord.Emoji>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Emoji | undefined {
        return emojis.get(text) || emojis.find((emoji): boolean => this.checkEmoji(text, emoji, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple custom emojis from a string, such as a name or a mention.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Emoji>} emojis Collection of emojis to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name match whole word only
     * @returns {Collection<Snowflake, Emoji>}
     */
    public resolveEmojis(text: string, emojis: Discord.Collection<Discord.Snowflake, Discord.Emoji>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Collection<Discord.Snowflake, Discord.Emoji> {
        return emojis.filter((emoji): boolean => this.checkEmoji(text, emoji, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to an emoji.
     * @param {string} text Text to check
     * @param {external:Emoji} emoji Emoji to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match whole word only
     * @returns {boolean}
     */
    public checkEmoji(text: string, emoji: Discord.Emoji, caseSensitive: boolean = false, wholeWord: boolean = false): boolean {
        if (emoji.id === text) return true;

        const reg = /<a?:[a-zA-Z0-9_]+:(\d{17,19})>/;
        const match = text.match(reg);
        if (match && emoji.id === match[1]) return true;

        text = caseSensitive ? text : text.toLowerCase();
        let { name } = emoji;
        name = caseSensitive ? name : name.toLowerCase();

        if (!wholeWord) {
            return name.includes(text) || name.includes(text.replace(/:/, ''));
        }

        return name === text || name === text.replace(/:/, '');
    }

    /**
     * Resolves a guild from a string, such as an ID or name.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Guild>} guilds Collection of guilds to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name full word only
     * @returns {external:Guild}
     */
    public resolveGuild(text: string, guilds: Discord.Collection<Discord.Snowflake, Discord.Guild>, caseSensitive: boolean = false, wholeWord: boolean = false): Discord.Guild | undefined {
        return guilds.get(text) || guilds.find((guild): boolean => this.checkGuild(text, guild, caseSensitive, wholeWord));
    }

    /**
     * Resolves multiple guilds from a string, such as an ID or name.
     * @param {string} text Text to resolve
     * @param {Collection<Snowflake, Guild>} guilds Collection of guilds to find in
     * @param {boolean} [caseSensitive=false] Makes finding by name case sensitive
     * @param {boolean} [wholeWord=false] Makes finding by name full word only
     * @returns {Collection<Snowflake, Guild>}
     */
    public resolveGuilds(text: string, guilds: Discord.Collection<Discord.Snowflake, Discord.Guild>, caseSensitive: boolean = false, wholeWord: boolean): Discord.Collection<Discord.Snowflake, Discord.Guild> {
        return guilds.filter((guild): boolean => this.checkGuild(text, guild, caseSensitive, wholeWord));
    }

    /**
     * Checks if a string could be referring to a guild.
     * @param {string} text Text to check
     * @param {external:Guild} guild Guild to check
     * @param {boolean} [caseSensitive=false] Makes checking by name case sensitive
     * @param {boolean} [wholeWord=false] Makes checking by name match full word only
     * @returns {boolean}
     */
    public checkGuild(text: string, guild: Discord.Guild, caseSensitive: boolean = false, wholeWord: boolean = false): boolean {
        if (guild.id === text) return true;

        text = caseSensitive ? text : text.toLowerCase();
        let { name } = guild;
        name = caseSensitive ? name : name.toLowerCase();

        if (!wholeWord) return name.includes(text);
        return name === text;
    }

    /**
     * An array of permission names.
     * @returns {string[]}
     */
    public permissionNames(): string[] {
        return Object.keys(Discord.Permissions.FLAGS);
    }

    /**
     * Resolved a permission number and returns an array of permissions names.
     * @param {number} num The permissions number
     * @returns {string[]}
     */
    public resolvePermissionNumber(num: number): string[] {
        const resolved: string[] = [];

        for (const key of Object.keys(Discord.Permissions.FLAGS)) {
            if (num & Discord.Permissions.FLAGS[key]) resolved.push(key);
        }

        return resolved;
    }

    /**
     * Compares two member objects presences and checks if they stopped or started a stream or not.
     * Returns `0`, `1`, or `2` for no change, stopped, or started.
     * @param {external:GuildMember} oldMember The old guild member
     * @param {external:GuildMember} newMember The new guild member
     * @returns {number}
     */
    public compareStreaming(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): 0 | 1 | 2 {
        const s1 = oldMember.presence.activity && oldMember.presence.activity.type === 'STREAMING';
        const s2 = newMember.presence.activity && newMember.presence.activity.type === 'STREAMING';
        if (s1 === s2) return 0;
        if (s1) return 1;
        if (s2) return 2;
        return 0;
    }

    /**
     * Combination of `<Client>.fetchUser()` and `<Guild>.fetchMember()`.
     * @param {external:Guild} guild The guild to fetch in
     * @param {string} id ID of the user to fetch
     * @param {boolean} cache Whether or not to add to the cache
     * @returns {Promise<external:GuildMember>}
     */
    public async fetchMember(guild: Discord.Guild, id: Discord.Snowflake, cache: boolean): Promise<Discord.GuildMember> {
        const user = await this.client.users.fetch(id, cache);
        return guild.members.fetch({ user, cache });
    }

    /**
     * Makes a MessageEmbed.
     * @param {external:MessageEmbed | external:MessageEmbedOptions} [data] The data to use for the embed
     * @returns {external:MessageEmbed}
     */
    public embed(data?: Discord.MessageEmbed | Discord.MessageEmbedOptions): Discord.MessageEmbed {
        return new Discord.MessageEmbed(data);
    }

    /**
     * Makes a MessageAttachment.
     * @param {external:BufferResolvable|Stream} file The file
     * @param {string} [name] The name of the file
     * @returns {external:MessageAttachment}
     */
    public attachment(file: string | Buffer | Stream, name?: string): Discord.MessageAttachment {
        return new Discord.MessageAttachment(file, name);
    }

    /**
     * Makes a Collection.
     * @param {Iterable} [iterable] Entries to fill with
     * @returns {external:Collection}
     */
    public collection<K, V>(iterable?: readonly (readonly [K, V])[]): Discord.Collection<K, V> {
        return new Discord.Collection(iterable);
    }

    /**
     * Makes a List.
     * @param {Iterable} [iterable] Entries to fill with
     * @returns {List}
     */
    public list<V>(iterable?: readonly V[]): List<V> {
        return new List(iterable);
    }
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
