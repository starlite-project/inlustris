import { Collection, MessageAttachment, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import { Stream } from 'stream';
import { InlustrisClient } from '../Client';
import { List } from './List';

export class ClientUtil {
    public constructor(public readonly client: InlustrisClient) { }

    public embed(data?: MessageEmbed | MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed(data);
    }

    public attachment(file: string | Buffer | Stream, name?: string): MessageAttachment {
        return new MessageAttachment(file, name);
    }

    public collection<K, V>(iterable?: readonly (readonly [K, V])[]): Collection<K, V> {
        return new Collection(iterable);
    }

    public list<V>(iterable?: readonly V[]): List<V> {
        return new List(iterable);
    }
}