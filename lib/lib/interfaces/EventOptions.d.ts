/// <reference types="node" />
import { EventEmitter } from 'events';
import { BaseOptions } from './BaseOptions';
export interface EventOptions extends BaseOptions {
    event?: string;
    emitter?: EventEmitter | string;
    once?: boolean;
}
