import { TimeResolvable } from '../schedule/ScheduledTask';

export interface ScheduledTaskUpdateOptions {
    time?: TimeResolvable;
    data?: any;
}
