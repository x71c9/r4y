/**
 *
 * Config module
 *
 * @packageDocumentation
 *
 */
import { Weights, DeepPartial } from 'w3i';
import * as types from '../types/index';
export declare const weights: Weights<types.Config>;
export declare function set(params: DeepPartial<types.Config>): void;
