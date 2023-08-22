/**
 *
 * Config set module
 *
 * @packageDocumentation
 *
 */
import * as types from '../types/index.js';
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type ConfigParams = DeepPartial<types.Config>;
export declare function set(params: ConfigParams): void;
export {};
