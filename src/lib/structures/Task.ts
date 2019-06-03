import { Base } from './Base';

/**
 * The task class, used for creating tasks.
 * @extends {Base}
 * @abstract
 */
export abstract class Task extends Base {
    /**
     * The run method, must be implemented in child classes.
     * @param {any} data The data passed when created
     * @abstract
     */
    public abstract run(data: any): any;
}
