import { ClientOptions } from 'discord.js';

export interface InlustrisOptions extends ClientOptions {
    plugins?: Iterable<string>;
    prefix?: string;
    token?: string;
    owners?: string[];
}