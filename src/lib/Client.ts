import { Client } from 'discord.js';
import { InlustrisOptions } from './interfaces/InlustrisOptions';
import { InlustrisPlugin } from './interfaces/InlustrisPlugin';
import { ClientUtil } from './util/ClientUtil';
import { InlustrisError } from './util/InlustrisError';
import { List } from './util/List';
import { Util } from './util/Util';
import { DefaultOptions } from './util/Constants';


/**
 * The base client for Inlustris.
 * @extends {external:Client}
 */
export class InlustrisClient extends Client {
    public options: InlustrisOptions;
    private _plugins: List<string>;
    public util: ClientUtil | null;
    private _token: string;
    [K: string]: any;
    public constructor(options: InlustrisOptions = {}) {
        options = Util.mergeDefault<InlustrisOptions>(DefaultOptions, options);
        super(options);

        this._plugins = new List([...options.plugins!]);

        this.util = null;

        this._token = options.token!;
    }

    public login(): never {
        throw new InlustrisError('DEPRECATED_METHOD', 'login', 'start');
    }

    public async start(): Promise<string> {
        for (const plugin of this._plugins) {
            const resolved = this._resolvePlugin(plugin);
            if (typeof resolved === 'string') continue;
            this._loadPlugin(resolved);
        }
        return super.login(this._token);
    }

    private _resolvePlugin(plugin: string): string | InlustrisPlugin {
        switch (plugin) {
            case 'util': {
                this.util = new ClientUtil(this);
                return 'util';
            }
            default: {
                return require(plugin);
            }
        }
    }

    public use(mod: string | any): this {
        this._plugins.add(mod);
        return this;
    }

    private _loadPlugin(plugin: InlustrisPlugin): void {
        try {
            this[plugin.name] = plugin.loader.call(this);
        } catch (e) {
            throw new InlustrisError('FAILED_TO_LOAD', plugin.name, e);
        }
    }
}


/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */