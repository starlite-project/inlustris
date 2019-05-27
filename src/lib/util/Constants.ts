import { InlustrisOptions } from '../interfaces/InlustrisOptions';
import { List } from './List';

export const DefaultOptions: InlustrisOptions = {
    token: '',
    plugins: new List<string>(['internals']),
    prefix: '!',
    owners: ['']
};