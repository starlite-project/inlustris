import { InlustrisClient } from '../Client';
import { ScheduledTaskOptions } from '../interfaces/ScheduledTaskOptions';
import { ScheduledTask } from './ScheduledTask';

/**
 * The schedule for the schedule plugin.
 */
export class Schedule {
    public client: InlustrisClient;

    public tasks: ScheduledTask[];

    private _interval: NodeJS.Timer | null;

    public constructor(client: InlustrisClient) {
        /**
         * The client
         * @type {InlustrisClient}
         */
        this.client = client;

        /**
         * The tasks that have been set
         * @type {ScheduledTask[]}
         */
        this.tasks = [];

        /**
         * The timer to check for tasks
         * @type {?NodeJS.Timer}
         * @private
         */
        this._interval = null;
    }

    /**
     * Initializes the schedule, placeholder while I work on settings.
     * Called when the client is ready.
     * @returns {Promise<void>}
     */
    public async init(): Promise<void> {
        this._checkInterval();
    }

    /**
     * Creates a task and adds it to the schedule.
     * @param {string} taskName The name of the task in the task registry
     * @param {(string|number|Date)} time The time for the task
     * @param {ScheduledTaskOptions} [options] The options for the task
     * @returns {?Promise<ScheduledTask>}
     */
    public async create(taskName: string, time: string | number | Date, options: ScheduledTaskOptions): Promise<ScheduledTask | null> {
        const task = await this._add(taskName, time, options);
        return task;
    }

    /**
     * Clears the tasks.
     * @returns {void}
     */
    public clear(): void {
        this.tasks = [];
    }

    /**
     * Gets a task by ID.
     * @param {string} id The ID of the task
     * @returns {?ScheduledTask}
     */
    public get(id: string): ScheduledTask | undefined {
        return this.tasks.find((entry): boolean => entry.id === id);
    }

    /**
     * The next task in the schedule.
     * @returns {?ScheduledTask}
     */
    public next(): ScheduledTask | undefined {
        return this.tasks[0];
    }

    /**
     * Adds a task to the schedule, called internally with `Schedule#create`.
     * @param {string} taskName The name of the task within the registry
     * @param {(string|number|Date)} time The time for the task to run
     * @param {ScheduledTaskOptions} [options={}] The options for the task
     * @returns {Promise<?ScheduledTask>}
     * @private
     */
    private async _add(taskName: string, time: Date | number | string, options: ScheduledTaskOptions = {}): Promise<ScheduledTask | null> {
        const task = new ScheduledTask(this.client, taskName, time, options);

        if (task.time.getTime() < Date.now()) {
            if (!task.recurring) {
                await task.delete();
                return null;
            }
            await task.update({ time: task.recurring });
        }

        this._insert(task);
        this._checkInterval();
        return task;
    }

    /**
     * Deletes a task from the schedule.
     * @param {string} id The ID of the task
     * @returns {Promise<Schedule>}
     */
    public async delete(id: string): Promise<this> {
        const taskIndex = this.tasks.findIndex((entry): boolean => entry.id === id);
        if (taskIndex === -1) throw new Error('This task does not exist');

        this.tasks.splice(taskIndex, 1);

        return this;
    }

    /**
     * Inserts a task into the schedule.
     * @param {ScheduledTask} task The task to insert
     * @returns {ScheduledTask}
     */
    public _insert(task: ScheduledTask): ScheduledTask {
        const index = this.tasks.findIndex((entry): boolean => entry.time > task.time);
        if (index === -1) this.tasks.push(task);
        else this.tasks.splice(index, 0, task);
        return task;
    }

    /**
     * Executes tasks that need to be executed.
     * @returns {Promise<void>}
     */
    public async execute(): Promise<void> {
        if (!this.client.ready) return;
        if (this.tasks.length) {
            const now = Date.now();
            const execute: Promise<ScheduledTask>[] = [];
            for (const task of this) {
                if (task.time.getTime() > now) break;
                execute.push(task.run());
            }
            if (!execute.length) return;
            await Promise.all(execute);
        }
        this._checkInterval();
    }

    /**
     * Clears the interval if no tasks are found.
     * @returns {void}
     * @private
     */
    private _clearInterval(): void {
        this.client.clearInterval(this._interval!);
        this._interval = null;
    }

    /**
     * Sets an interval if one needs to be set.
     * @returns {void}
     * @private
     */
    private _checkInterval(): void {
        if (!this.tasks.length) this._clearInterval();
        else if (!this._interval) this._interval = this.client.setInterval(this.execute.bind(this), this.client.options.schedule!.interval!);
    }

    /**
     * An iterator yielding all the tasks.
     * @name @@iterator
     * @method
     * @instance
     * @generator
     * @returns {Iterator<ScheduledTask>}
     * @memberof Schedule
     */
    public *[Symbol.iterator](): IterableIterator<ScheduledTask> {
        yield* this.tasks;
    }
}
