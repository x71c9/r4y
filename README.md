# r4y

A typescript library for spawning child processes.

## How to use it

```typescript
import ray from 'r4y';
await ray.execute('echo $WHATEVER');
await ray.spawn('find . -type f | wc');
```

## Configuration

```typescript
import ray from 'r4y';
```
