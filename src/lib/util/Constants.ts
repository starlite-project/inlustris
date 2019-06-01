import { InlustrisOptions } from '../interfaces/InlustrisOptions';
import { List } from './List';

export const DefaultOptions: InlustrisOptions = {
    token: '',
    plugins: new List<string>(),
    prefix: '!',
    owners: []
};

export const MENTION_REGEX = {
    userOrMember: /^(?:<@!?)?(\d{17,19})>?$/,
    channel: /^(?:<#)?(\d{17,19})>?$/,
    emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/,
    role: /^(?:<@&)?(\d{17,19})>?$/,
    snowflake: /^(\d{17,19})$/
};

export enum ARGUMENT_MATCHES {
    PHRASE = 'phrase',
    FLAG = 'flag',
    OPTION = 'option',
    SEPARATE = 'separate',
    TEXT = 'text',
    CONTENT = 'content',
    REST_CONTENT = 'restContent',
    NONE = 'none'
}

export enum ARGUMENT_TYPES {
    STRING = 'string',
    LOWERCASE = 'lowercase',
    UPPERCASE = 'uppercase',
    CHAR_CODES = 'charCodes',
    NUMBER = 'number',
    INTEGER = 'integer',
    BIGINT = 'bigint',
    EMOJINT = 'emojint',
    URL = 'url',
    DATE = 'date',
    COLOR = 'color',
    USER = 'user',
    USERS = 'users',
    MEMBER = 'member',
    MEMBERS = 'members',
    RELEVANT = 'relevant',
    RELEVANTS = 'relevants',
    CHANNEL = 'channel',
    CHANNELS = 'channels',
    TEXT_CHANNEL = 'textChannel',
    TEXT_CHANNELS = 'textChannels',
    VOICE_CHANNEL = 'voiceChannel',
    VOICE_CHANNELS = 'voiceChannels',
    ROLE = 'role',
    ROLES = 'roles',
    EMOJI = 'emoji',
    EMOJIS = 'emojis',
    GUILD = 'guild',
    GUILDS = 'guilds',
    MESSAGE = 'message',
    GUILD_MESSAGE = 'guildMessage',
    RELEVANT_MESSAGE = 'relevantMessage',
    INVITE = 'invite',
    MEMBER_MENTION = 'memberMention',
    CHANNEL_MENTION = 'channelMention',
    ROLE_MENTION = 'roleMention',
    EMOJI_MENTION = 'emojiMention'
}