# r4y

A typescript library for spawning and executing child processes.

## Implementation

A common implementation is the following:

```typescript
import ray from 'r4y';

const response = await ray.execute('echo $WHATEVER');
console.log(response);

await ray.spawn('find . -type f | wc');
```

## Configuration

```typescript
import ray from 'r4y';
ray.config.set({
  debug: false,
  spin: false,
  spawn: {
    log: {
      stdout: 'trace',
      stderr: 'error',
    }
  },
});
```

### Configuration parameters

| Parameter name | Parameter type | Parameter description |
| -------------- | -------------- | --------------------- |
| `debug` | `boolean` | Wheater or not to console log debugging information like child ID |
| `spin` | `boolean` | Wheater or not to show a spinning console log |
| `spawn.log.stdout` | `LogMethod` | How the child process should log its `stdout` |
| `spawn.log.stderr` | `LogMethod` | How the child process should log its `stderr` |

```typescript
type LogMethod = 'trace' | 'debug' | 'info' | 'warn' | 'error';
```

## Unix philosophy

This repo try to follow the
[Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy).

## Name

`r4y` stands for ray, like in [Radioactive ray](https://en.wikipedia.org/wiki/Radiation).

## Other related repositories

[`3xp`](https://www.npmjs.com/package/3xp) A typescript library for validating objects.

[`i0n`](https://www.npmjs.com/package/i0n) A typescript library for console logging.

[`w3i`](https://www.npmjs.com/package/w3i) A typescript library for handling configurations.
