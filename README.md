# ExampleAngularAsync

A demo application that illustrates **why making Angular lifecycle methods `async` is an anti-pattern**.

## The Problem

Angular does **not** await async lifecycle hooks. When a lifecycle method such as `ngOnInit()` is declared `async`, Angular calls it and immediately moves on without waiting for any `await` expressions inside it to resolve.

This creates a misleading code pattern: it _looks_ like Angular will pause and wait for asynchronous operations to finish, but it won't.

### Demonstration

`AppComponent` intentionally uses the problematic pattern:

```ts
// ❌ Anti-pattern — Angular does NOT wait for this to complete
async ngOnInit() {
  await this.callFakeApi1();          // Angular has already moved on
  Promise.all([
    this.callFakeApi2(),
    this.callFakeApi3(),
    this.callFakeApi4(),
    this.callFakeApi5(),
  ]).then(() => {
    this.loading.set(false);          // may run after the view has already rendered
  });
  this.ngOnInitDone.set(true);
}
```

The template renders two status indicators:

- **"Loading..."** / **"Done Loading"** — driven by the `loading` signal, which is set to `false` only after all five fake API calls resolve.
- **"ngOnInit Done"** — set at the end of `ngOnInit()`, demonstrating that Angular considers the lifecycle hook complete as soon as the function body runs past its last synchronous statement, regardless of any pending awaits.

Because Angular fires `ngOnInit()` and continues immediately, the component renders before the data is available. The ESLint rules `@typescript-eslint/no-misused-promises` and `@angular-eslint/no-async-lifecycle-method` are intentionally suppressed on this method to let the broken pattern compile — in a real project those rules would correctly flag the problem.

### Why This Matters

| Scenario                                    | What you expect                             | What actually happens                                           |
| ------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| `async ngOnInit()` fetches data             | Component waits, then renders with data     | Component renders immediately with `undefined` data             |
| `await` inside `ngOnInit()`                 | Execution pauses until the promise resolves | Angular moves on; `await` only pauses the async function itself |
| `ngOnDestroy()` / `ngAfterViewInit()` async | Same misleading behavior                    | Angular does not await these either                             |

### Recommended Alternatives

Instead of making lifecycle methods async, use one of the following Angular-idiomatic approaches:

1. **Call async functions and handle the promise explicitly** — fire off the promise and manage its result with `.then()` / `.catch()` or a signal.
2. **Route resolvers** — pre-fetch data before the component activates so it is available synchronously on init.
3. **Signals with the `async` pipe or `toSignal()`** — expose an Observable or Promise as a signal; the template reacts automatically when the value arrives.
4. **RxJS reactive patterns** — compose data streams with operators like `switchMap`, `combineLatest`, or `forkJoin` and subscribe in the template via `async` pipe.

```ts
// ✅ Correct — fire-and-forget with explicit state management
ngOnInit() {
  this.loadData();
}

private loadData() {
  this.callFakeApi1().then(() => {
    return Promise.all([
      this.callFakeApi2(),
      this.callFakeApi3(),
    ]);
  }).then(() => {
    this.loading.set(false);
  });
}
```

## Development

### Prerequisites

Install dependencies:

```bash
npm install
```

### Dev server

```bash
npm run start
```

Open `http://localhost:4200/`. The app reloads automatically on file changes.

### Build

```bash
npm run build        # production
npm run build:dev    # development
```

### Tests

```bash
npm run test:unit    # unit tests (Vitest)
npm run test:e2e     # end-to-end tests (Playwright)
```

### Lint & format

```bash
npm run lint         # ESLint (all files)
npm run lint:fix     # ESLint with auto-fix
npm run prettier     # Prettier format
npm run prettier:test  # Prettier check (no write)
```

## Updating Angular

Replace `VERSION` with the target version:

```shell
npm run ng -- update @angular/core@VERSION @angular/cli@VERSION @angular/material@VERSION angular-eslint@VERSION
```

For example, to update to v22:

```shell
npm run ng -- update @angular/core@22 @angular/cli@22 @angular/material@22 angular-eslint@22
```

## Additional Resources

- [Angular lifecycle hooks](https://angular.dev/guide/components/lifecycle)
- [Angular route resolvers](https://angular.dev/guide/routing/resolve-data)
- [Angular signals](https://angular.dev/guide/signals)
- [Angular CLI overview](https://angular.dev/tools/cli)
