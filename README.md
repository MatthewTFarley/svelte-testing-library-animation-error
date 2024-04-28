# Svelte Testing Library Animation Error

Demonstration of Element.animate error when running Svelte 5 in Svelte Testing Library

## Setup

```sh
npm install --force # bypass peer dependency errors due to using Svelte 5
npm run test
```

Error:

```
TypeError: element.animate is not a function
 ❯ animate node_modules/svelte/src/internal/client/dom/elements/transitions.js:353:23
    351|
    352|     if (t2 === 1) {
    353|      animation.cancel();
       |                       ^
    354|     }
    355|    })
 ❯ Object.in node_modules/svelte/src/internal/client/dom/elements/transitions.js:218:13
 ❯ node_modules/svelte/src/internal/client/dom/elements/transitions.js:276:54
 ❯ Module.untrack node_modules/svelte/src/internal/client/runtime.js:868:10
 ❯ Object.fn node_modules/svelte/src/internal/client/dom/elements/transitions.js:276:27
 ❯ execute_reaction_fn node_modules/svelte/src/internal/client/runtime.js:260:20
 ❯ execute_effect node_modules/svelte/src/internal/client/runtime.js:427:18
 ❯ flush_queued_effects node_modules/svelte/src/internal/client/runtime.js:468:4
 ❯ flush_nested_effects node_modules/svelte/src/internal/client/runtime.js:631:4
 ❯ flush_queued_root_effects node_modules/svelte/src/internal/client/runtime.js:451:3

This error originated in "src/routes/Toggle.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
The latest test that might've caused the error is "does not show "Hi" when the button is clicked twice". It might mean one of the following:
- The error was thrown, while Vitest was running this test.
- If the error occurred after the test had been completed, this was the last documented test before it was thrown.
```

A simple vitest-centric mock of `Element.prototype.animate` is included as commented code in the test file to offer a workaround to this issue. Reproduced here:

```ts
Element.prototype.animate ??= vi.fn().mockReturnValue({
  finished: Promise.resolve(),
  cancel: vi.fn(),
  startTime: null,
  currentTime: null,
});
```
