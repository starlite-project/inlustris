import { InlustrisClient } from '../Client';
import { ScheduledTaskOptions } from '../interfaces/ScheduledTaskOptions';
import { ScheduledTaskUpdateOptions } from '../interfaces/ScheduledTaskUpdateOptions';
import { Task } from '../structures/Task';
import { Cron } from '../util/Cron';
import { Util } from '../util/Util';
import { Schedule } from './Schedule';
const { isObject } = Util;

/**
 * Something that is able to be resolved to a time, used for tasks
 * @typedef {(Date|number|Cron|string)} TimeResolvable
 */
export type TimeResolvable = Date | number | Cron | string;

/**
 * A scheduled task, used for creating tasks.
 */
export class ScheduledTask {
    public taskName: string;

    public recurring: Cron | null;

    public time: Date;

    private running: boolean;

    public readonly client: InlustrisClient;

    public id: string;

    public data: any;

    public constructor(client: InlustrisClient, taskName: string, time: TimeResolvable, options: ScheduledTaskOptions = {}) {
        const [_time, _recurring] = (this.constructor as typeof ScheduledTask)._resolveTime(time);

        /**
         * The client
         * @name ScheduledTask#client
         * @type {InlustrisClient}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The name of the task
         * @type {string}
         */
        this.taskName = taskName;

        /**
         * When the task should recur
         * @type {?Cron}
         */
        this.recurring = _recurring;

        /**
         * The time that this task should run
         * @type {Date}
         */
        this.time = 'time' in options ? new Date((options as ScheduledTaskOptions).time!) : _time;

        /**
         * The unique ID of the task
         * @type {string}
         */
        this.id = options.id || (this.constructor as typeof ScheduledTask)._generateID(this.client);

        /**
         * The data to pass to the task when ran
         * @type {any}
         */
        this.data = 'data' in options && isObject(options.data) ? options.data : {};

        /**
         * Whether the task is running
         * @private
         * @type {boolean}
         */
        this.running = false;

        (this.constructor as typeof ScheduledTask)._validate(this);
    }

    /**
     * The task that this is for
     * @type {?Task}
     * @readonly
     */
    public get task(): Task | null {
        return this.client.tasks!.get(this.taskName) || null;
    }

    /**
     * The schedule for the task
     * @type {Schedule}
     * @readonly
     */
    public get registry(): Schedule {
        return this.client.schedule!;
    }

    /**
     * Runs the task, passing data to the appropriate task
     * @returns {Promise<ScheduledTask>}
     */
    public async run(): Promise<this> {
        const { task } = this;
        if (!task || !task.enabled || this.running) return this;

        this.running = true;
        try {
            await task.run({ id: this.id, ...this.data });
        } catch (err) {
            this.client.emit('taskError', this, task, err);
        }
        this.running = false;
        return this;
    }

    /**
     * Updates a task, called if a task is recurring.
     * @param {ScheduledTaskUpdateOptions} [options] The options to update the task with
     * @returns {Promise<ScheduledTask>}
     */
    public async update({ time, data }: ScheduledTaskUpdateOptions = {}): Promise<this> {
        if (time) {
            const [_time, _cron] = (this.constructor as typeof ScheduledTask)._resolveTime(time);
            this.time = _time;
            this.registry.tasks.splice(this.registry.tasks.indexOf(this), 1);
            this.registry._insert(this);
            this.recurring = _cron;
        }
        if (data) this.data = data;
        return this;
    }

    /**
     * Deletes the task from the schedule.
     * @returns {Promise<Schedule>}
     */
    public delete(): Promise<Schedule> {
        return this.registry.delete(this.id);
    }

    /**
     * Resolves a TimeResolvable into a time.
     * @param {TimeResolvable} time The time to resolve
     * @returns {any[]}
     * @private
     */
    private static _resolveTime(time: TimeResolvable): any[] {
        if (time instanceof Date) return [time, null];
        if (time instanceof Cron) return [time.next(), time];
        if (typeof time === 'number') return [new Date(time), null];
        if (typeof time === 'string') {
            const cron = new Cron(time);
            return [cron.next(), cron];
        }
        throw new Error('Invalid time passed');
    }

    /**
     * Generates a unique ID for the task.
     * @param {InlustrisClient} client The client
     * @returns {string}
     * @private
     */
    private static _generateID(client: InlustrisClient): string {
        const id = client.shard ? (Array.isArray(client.shard.ids) ? client.shard.ids[0] : client.shards.ids).toString(36) : '';
        return Date.now().toString(36) + id;
    }

    /**
     * Validates a task, called on creation.
     * @param {ScheduledTask} st The task to validate
     * @returns {void}
     * @private
     */
    private static _validate(st: ScheduledTask): void {
        if (!st.task) throw new Error('Invalid task');
        if (!st.time) throw new Error('Time or repeat option is required');
        if (Number.isNaN(st.time.getTime())) throw new Error('Invalid time passed');
    }
}
