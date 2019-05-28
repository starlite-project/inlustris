import { BaseOptions } from './BaseOptions';
import { EventEmitter } from 'events';

export interface EventOptions extends BaseOptions {
    event?: string;
    emitter?: EventEmitter | string;
    once?: boolean;
}