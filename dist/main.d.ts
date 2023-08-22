/**
 *
 * Main module
 *
 * @packageDocumentation
 *
 */
type ExecuteOptions = {} & LogOption;
export declare function execute(command: string, options?: Partial<ExecuteOptions>): Promise<any>;
type Stdio = 'pipe' | 'overlapped' | 'ignore' | 'inherit';
type SpawnOption = {
    stdio: Stdio | Stdio[];
    shell: boolean;
    cwd: string;
    detached: boolean;
} & LogOption;
type LogOption = {
    spin: boolean;
};
export declare function spawn(command: string, options?: Partial<SpawnOption>): Promise<unknown>;
export {};
