/**
 *
 * Spawn module
 *
 * @packageDocumentation
 *
 */
import * as types from './types/index';
type Stdio = 'pipe' | 'overlapped' | 'ignore' | 'inherit';
type SpawnOption = {
    stdio: Stdio | Stdio[];
    shell: boolean;
    cwd: string;
    detached: boolean;
} & types.LogOption;
export declare function spawn(command: string, options?: Partial<SpawnOption>): Promise<unknown>;
export {};
