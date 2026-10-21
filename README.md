# component-template

Clean Day-1 monorepo for a **publishable React component** + **playground** + **Playwright e2e**. Inspired by Sonner’s architecture: imperative module store, single mount point, CSS via `data-*`.

```
component-template/
├── packages/react/     # @component-template/react (publishes dist/)
├── apps/playground/    # Vite kitchen sink
├── e2e/                # Playwright smoke tests
└── playwright.config.ts
```

## Principles

1. **Imperative API + one mount** — call `toast()` anywhere; render once with `<Toaster />`.
2. **Module singleton store** — React state is a projection of an Observer (`state.ts`), not Context.
3. **Tiny public surface** — only what `src/index.ts` exports ships as API.
4. **CSS owns chrome** — short `styles.css` driven by `data-*` attributes.
5. **Playground = living matrix** — e2e hits the same app you click through locally.

## Commands

```bash
bun install
bun run build          # packages/react → dist/
bun run dev            # playground on http://127.0.0.1:5173
bun run typecheck
bun run test:e2e       # Playwright (install browsers once: bunx playwright install chromium)
```

## Package usage

```tsx
import { toast, Toaster } from "@component-template/react";
import "@component-template/react/styles.css";

export function App() {
  return (
    <>
      <button onClick={() => toast.success("Saved")}>Save</button>
      <Toaster />
    </>
  );
}
```

**Next.js App Router:** mount `<Toaster />` inside a Client Component (`"use client"`) — typically in a root layout client boundary. This Vite playground does not need that directive.

## Workspaces

Bun workspaces (`packages/*`, `apps/*`). Playground depends on `@component-template/react` via `workspace:*`.

## Publishing

Only `packages/react` is meant for npm (`"files": ["dist"]`). Dual ESM/CJS + `.d.ts` via tsup; CSS copied to `dist/styles.css`.