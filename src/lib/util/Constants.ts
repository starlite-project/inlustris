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
