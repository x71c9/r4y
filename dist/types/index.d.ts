/**
 *
 * Types index module
 *
 * @packageDocumentation
 *
 */
import ion from 'i0n';
import { ObjectValue } from './utils';
export type Config = {
    debug: boolean;
    spin: boolean;
    spawn: {
        log: {
            stdout: LogMethod;
            stderr: LogMethod;
        };
    };
    spinner: ion.Spinner;
};
export type LogOption = {
    spin: boolean;
};
export declare const LOG_METHOD: {
    readonly trace: "trace";
    readonly debug: "debug";
    readonly info: "info";
    readonly warn: "warn";
    readonly error: "error";
};
export type LogMethod = ObjectValue<typeof LOG_METHOD>;
