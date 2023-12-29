/**
 *
 * Execute module
 *
 * @packageDocumentation
 *
 */
import * as types from './types/index';
type ExecuteOptions = {
    cwd?: string;
} & types.LogOption;
export declare function execute(command: string, options?: Partial<ExecuteOptions>): Promise<any>;
export {};
