import { BaseRegistry } from './BaseRegistry';
import { Task } from '../structures/Task';
import { InlustrisClient } from '../Client';

/**
 * The registry where tasks are loaded and stored.
 * @extends {BaseRegistry}
 */
export class TaskRegistry extends BaseRegistry<Task, typeof Task> {
    public constructor(client: InlustrisClient) {
        super(client, 'tasks', Task);
    }
}
