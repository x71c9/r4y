/**
 *
 * Config module
 *
 * @packageDocumentation
 *
 */
import { Weights, DeepPartial } from 'w3i';
import * as types from '../types/index.js';
export declare const weights: Weights<types.Config>;
export declare const set: (params: DeepPartial<types.Config>) => void;
