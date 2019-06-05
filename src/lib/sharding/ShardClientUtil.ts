import { ClusterIPC } from './ClusterIPC';
import { SendOptions } from 'veza';
import { Util, ShardClientUtil as DiscordShardUtil, Guild, User } from 'discord.js';
import { InlustrisClient } from '../Client';
import { IPCEvents } from '../util/Constants';

export interface IPCResult<D> { // eslint-disable-line
    success: boolean;
    d: D;
}

class FetchError extends Error {
    private type: string;

    public constructor(type: string, id: string) {
        super(`No ${type} with the ID ${id} found`);
        this.type = type;
    }

    public get name(): string {
        return `FetchError [${this.type.toUpperCase()}]`;
    }
}

export class ShardClientUtil {
    public readonly clusterCount: number = Number(process.env.CLUSTER_CLUSTER_COUNT);

    public readonly shardCount: number = Number(process.env.CLUSTER_SHARD_COUNT);

    public readonly id: number = Number(process.env.CLUSTER_ID);

    public readonly ipc = new ClusterIPC(this.client, this.id, this.ipcSocket);

    public constructor(public client: InlustrisClient, public ipcSocket: string | number) { }

    public broadcastEval<T>(script: string | Function): Promise<T[]> {
        return this.ipc.broadcast<T>(script);
    }

    public masterEval<T>(script: string | Function): Promise<T> {
        return this.ipc.masterEval<T>(script);
    }

    public fetchClientValues(prop: string): Promise<any[]> {
        return this.ipc.broadcast(`this.${prop}`);
    }

    public async fetchGuild(id: string): Promise<Guild> {
        const { success, d } = await this.send<IPCResult<Guild>>({ op: IPCEvents.FETCHGUILD, d: id });
        if (!success) throw new FetchError('guild', id);
        return d;
    }

    public async fetchUser(id: string): Promise<User> {
        const { success, d } = await this.send<IPCResult<User>>({ op: IPCEvents.FETCHUSER, d: id });
        if (!success) throw new FetchError('user', id);
        return d;
    }

    public send<T>(data: any, options?: SendOptions): Promise<T> {
        if (typeof data === 'object') {
            if (data.op) return this.ipc.server.send(data, options);
        }
        return this.ipc.server.send({ op: IPCEvents.MESSAGE, d: data }, options);
    }

    public init(): Promise<void> {
        return this.ipc.init();
    }
}
