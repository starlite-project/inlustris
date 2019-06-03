// Copyright (c) 2017-2019 Dirigeants. All rights reserved. MIT License.

import { TIME, tokenRegex as tokensRegex } from './Constants';
const { DAY, CRON } = TIME;
const { allowedNum, partRegex, wildcardRegex, predefined, tokens } = CRON;

/**
 * Cron utility class, used for creating tasks.
 */
export class Cron {
    public cron: string;

    public normalized: string;

    public minutes: number[];

    public hours: number[];

    public days: number[];

    public months: number[];

    public dows: number[];

    /** @param {string} cron */
    public constructor(cron: string) {
        /**
         * The cron string that generated this
         * @type {string}
         */
        this.cron = cron.toLowerCase();
        /**
         * The normalized cron string
         * @type {string}
         */
        this.normalized = (this.constructor as typeof Cron)._normalize(this.cron);

        [this.minutes, this.hours, this.days, this.months, this.dows] = (this.constructor as typeof Cron)._parseString(this.normalized);
    }

    /**
     * Gets the next instance that this will trigger.
     * @param {Date} [outset=new Date()] The previous date
     * @param {boolean} [origin=true] Whether this is the original call
     * @returns {Date}
     */
    public next(outset: Date = new Date(), origin: boolean = true): Date {
        if (!this.days.includes(outset.getUTCDate()) || !this.months.includes(outset.getUTCMonth() + 1) || !this.dows.includes(outset.getUTCDay())) {
            return this.next(new Date(outset.getTime() + DAY), false);
        }
        if (!origin) return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), this.hours[0], this.minutes[0]));

        const now = new Date(outset.getTime() + 60000);

        for (const hour of this.hours) {
            if (hour < now.getUTCHours()) continue;
            for (const minute of this.minutes) {
                if (hour === now.getUTCHours() && minute < now.getUTCMinutes()) continue;
                return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), hour, minute));
            }
        }

        return this.next(new Date(outset.getTime() + DAY), false);
    }

    /**
     * Normalizes a string into a cron-parsed string.
     * @param {string} cron The cron to parse
     * @returns {string}
     * @private
     */
    private static _normalize(cron: string): string {
        if (cron in predefined) return predefined[cron];
        const now = new Date();
        // @ts-ignore
        cron = cron.split(' ').map((val, i): string => val.replace(wildcardRegex, (match): string | number => {
            if (match === 'h') return Math.floor(Math.random() * (allowedNum[i][1] + 1));
            if (match === '?') {
                switch (i) {
                    case 0: return now.getUTCMinutes();
                    case 1: return now.getUTCHours();
                    case 2: return now.getUTCDate();
                    case 3: return now.getUTCMonth();
                    case 4: return now.getUTCDay();
                }
            }
            return match;
        })).join(' ');
        return cron.replace(tokensRegex, (match): string => tokens[match]);
    }

    /**
     * Parses a string into numbers.
     * @param {string} cron The cron string to parse
     * @returns {Array<Array<number>>}
     * @private
     */
    private static _parseString(cron: string): number[][] {
        const parts = cron.split(' ');
        if (parts.length !== 5) throw new Error('Invalid Cron Provided');
        return parts.map(Cron._parsePart);
    }

    /**
     * Parses a part into a cron number
     * @param {string} cronPart The cron part to parse
     * @param {number} id The place of the part
     * @returns {Array<number>}
     * @private
     */
    private static _parsePart(cronPart: string, id: number): number[] {
        if (cronPart.includes(',')) {
            const res: number[] = [];
            for (const part of cronPart.split(',')) res.push(...Cron._parsePart(part, id));
            return [...new Set(res)].sort((a, b): number => a - b);
        }

        let [, wild, min, max, step] = partRegex.exec(cronPart)!;

        // @ts-ignore
        if (wild) [min, max] = allowedNum[id];
        else if (!max && !step) return [parseInt(min)];
        // @ts-ignore
        return Cron._range(...[parseInt(min), parseInt(max) || allowedNum[id][1]].sort((a, b): number => a - b), parseInt(step) || 1);
    }

    /**
     * Creates a range for cron
     * @param {number} min The minimum
     * @param {number} max The maximum
     * @param {number} step How much the range steps by
     * @returns {Array<number>}
     * @private
     */
    private static _range(min: number, max: number, step: number): number[] {
        return new Array(Math.floor((max - min) / step) + 1).fill(0).map((val, i): number => min + (i * step));
    }
}
