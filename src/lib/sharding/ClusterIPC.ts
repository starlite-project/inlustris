import { EventEmitter } from 'events';
import { Node, NodeMessage, NodeSocket } from 'veza';
import { Util } from 'discord.js';
import { InlustrisClient } from '../Client';
import { IPCEvents } from '../util/Constants';

export class ClusterIPC extends EventEmitter {
    public nodeSocket?: NodeSocket;

    public client: InlustrisClient;

    public node: Node;

    public constructor(inlustrisClient: InlustrisClient, public id: number, public socket: string | number) {
        super();
        this.client = inlustrisClient;
        this.node = new Node(`Cluster ${this.id}`)
            .on('error', (error): boolean => this.emit('error', error))
            .on('client.disconnect', (client): boolean => this.emit('warn', `[IPC] Disconnected from ${client.name}`))
            .on('client.ready', (client): boolean => this.emit('debug', `[IPC] Connected to: ${client.name}`))
            .on('message', this._message.bind(this));
    }

    public async broadcast<T>(script: string | Function): Promise<T[]> {
        script = typeof script === 'function' ? `(${script})(this)` : script;
        const { success, d } = await this.server.send({ op: IPCEvents.BROADCAST, d: script });
        if (!success) throw Util.makeError(d);
        return d;
    }

    public async masterEval<T>(script: string | Function): Promise<T> {
        script = typeof script === 'function' ? `(${script})(this)` : script;
        const { success, d } = await this.server.send({ op: IPCEvents.MASTEREVAL, d: script });
        if (!success) throw Util.makeError(d);
        return d;
    }

    public async init(): Promise<void> {
        this.nodeSocket = await this.node.connectTo('Master', String(this.socket));
    }

    public get server(): NodeSocket {
        return this.nodeSocket!;
    }

    private _eval(script: string): string {
        const client: any = this.client;
        return client._eval(script);
    }

    private async _message(message: NodeMessage): Promise<void> {
        const { op, d } = message.data;
        if (op === IPCEvents.EVAL) {
            try {
                message.reply({ success: true, d: await this._eval(d) });
            } catch (err) {
                message.reply({ success: false, d: { name: err.name, message: err.message, stack: err.stack } });
            }
        }
    }
}
