/**
 *
 * Main module
 *
 * @packageDocumentation
 *
 */
export declare function execute(command: string): Promise<any>;
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
export declare function spawn(command: string, options: Partial<SpawnOption>): Promise<unknown>;
export {};
