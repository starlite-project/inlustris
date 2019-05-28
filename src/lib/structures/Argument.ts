import { MENTION_REGEX } from '../util/Constants';
import { AliasPiece } from './base/AliasPiece';

/**
 * Base argument class for creating arguments
 * @extends {AliasPiece}
 */
export abstract class Argument extends AliasPiece {
    /**
     * Standard regular expressions for matching mentions and snowflake ids
     * @type {Object}
     * @property {RegExp} userOrMember Regex for users or members
     * @property {RegExp} channel Regex for channels
     * @property {RegExp} emoji Regex for custom emojis
     * @property {RegExp} role Regex for roles
     * @property {RegExp} snowflake Regex for simple snowflake ids
     */
    public static regex = MENTION_REGEX;

    public abstract run(arg: string, possible: any, msg: any): any;
}