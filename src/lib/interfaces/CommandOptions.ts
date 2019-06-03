import { BaseOptions } from './BaseOptions';

export interface CommandOptions extends BaseOptions {
    aliases?: string[];
    separator?: string;
}
