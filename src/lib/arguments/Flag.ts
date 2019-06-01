import { Message } from 'discord.js';

/**
 * Represents a special return value during command execution or argument parsing.
 */
export class Flag {
    public type: string;
    public data: any;
    public constructor(type: string, data: any = {}) {
        this.type = type;
        Object.assign(this, data);
    }

    public static cancel(): Flag {
        return new Flag('cancel');
    }

    public static retry(message: Message): Flag {
        return new Flag('retry', { message });
    }

    public static fail(value: any): Flag {
        return new Flag('fail', { value });
    }

    public static continue(command: string, ignore: boolean = false, rest: any = null): Flag {
        return new Flag('continue', { command, ignore, rest });
    }

    public static is(value: any, type: string): boolean {
        return value instanceof Flag && value.type === type;
    }
}