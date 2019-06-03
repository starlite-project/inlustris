import { InlustrisOptions } from '../interfaces/InlustrisOptions';
import { List } from './List';

export const DefaultOptions: InlustrisOptions = {
    token: '',
    plugins: new List<string>(),
    prefix: '!',
    owners: []
};

export const MENTION_REGEX = {
    userOrMember: /^(?:<@!?)?(\d{17,19})>?$/,
    channel: /^(?:<#)?(\d{17,19})>?$/,
    emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/,
    role: /^(?:<@&)?(\d{17,19})>?$/,
    snowflake: /^(\d{17,19})$/
};

export const TIME = {
    SECOND: 1000,
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
    DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    CRON: {
        partRegex: /^(?:(\*)|(\d+)(?:-(\d+))?)(?:\/(\d+))?$/,
        wildcardRegex: /\bh\b|\B\?\B/g,
        allowedNum: [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]],
        predefined: {
            '@annually': '0 0 1 1 *',
            '@yearly': '0 0 1 1 *',
            '@monthly': '0 0 1 * *',
            '@weekly': '0 0 * * 0',
            '@daily': '0 0 * * *',
            '@hourly': '0 * * * *'
        },
        tokens: {
            jan: 1,
            feb: 2,
            mar: 3,
            apr: 4,
            may: 5,
            jun: 6,
            jul: 7,
            aug: 8,
            sep: 9,
            oct: 10,
            nov: 11,
            dec: 12,
            sun: 0,
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5,
            sat: 6
        }
    }
};

export const tokenRegex: RegExp = new RegExp(Object.keys(TIME.CRON.tokens).join('|'), 'g');
