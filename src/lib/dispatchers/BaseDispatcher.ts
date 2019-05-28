import { InlustrisClient } from '../Client';
import { BaseRegistry } from '../registries/BaseRegistry';
import { Base } from '../structures/Base';

/**
 * The base dispatcher to handle the dispatching of bases.
 * @abstract
 */
export abstract class BaseDispatcher {
    public readonly client: InlustrisClient;
    public readonly registry: BaseRegistry<Base, typeof Base>;

    public constructor(client: InlustrisClient, registry: BaseRegistry<Base, typeof Base>) {
        /**
         * The client this Dispatcher is for
         * @type {InlustrisClient}
         * @name BaseDispatcher#client
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The registry this dispatcher is for
         * @type {BaseRegistry}
         * @name BaseDispatcher#registry
         * @readonly
         */
        Object.defineProperty(this, 'registry', { value: registry });
    }
}