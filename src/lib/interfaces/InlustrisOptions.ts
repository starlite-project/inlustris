import { ClientOptions } from 'discord.js';
import { InlustrisPlugin } from './InlustrisPlugin';

export interface InlustrisOptions extends ClientOptions {
    plugins?: Iterable<string>;
    prefix?: string;
    token?: string;
}