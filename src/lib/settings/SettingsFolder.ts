import { Util } from '../util/Util';
import { Type } from '../util/Type';

const { isObject, objectToTuples, arrayStrictEquals, toTitleCase, mergeObjects, makeObject, resolveGuild } = Util;

type PrimitiveType = string | number | boolean;
export type SettingsValue = PrimitiveType | object;

/**
 * The SettingsFolder class that manages the data for an entry from the database.
 * @extends Map
 */
class SettingsFolder extends Map<string, SettingsFolder | SettingsValue | readonly SettingsValue[]> {
    public readonly base: any;

    public readonly schema: any;
}
