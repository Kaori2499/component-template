# component-template

GitHub **template repo** for building and previewing a publishable React component library.

Day-1 layout: one package, one Vite playground, Playwright e2e. Swap the stub `Button` for your component and keep the same tooling. When the component is finished, [rewrite this README](#write-the-public-readme) to match [sidebar](https://github.com/Kaori2499/sidebar/blob/main/README.md) and [video-player](https://github.com/Kaori2499/video-player/blob/main/README.md), then [publish the playground](#publish-the-playground-to-github-pages).

```
component-template/
├── packages/react/     # @component-template/react (publishable stub)
├── apps/playground/    # Vite preview host
├── e2e/                # Playwright against the playground
├── .github/workflows/  # ci.yml; pages.yml.example is the Pages starter
└── playwright.config.ts
```

## Commands

```bash
bun install
bun run build          # packages/react → dist/ (ESM + CJS + CSS)
bun run dev            # playground → http://127.0.0.1:5173
bun run typecheck
bunx playwright install chromium   # once
bun run test:e2e
```

## Stub usage

```tsx
import { Button } from "@component-template/react";
import "@component-template/react/styles.css";

export function Example() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
    </>
  );
}
```

## Replace the component

1. **Rename the package** (optional) in `packages/react/package.json` and update the `workspace:*` dependency in `apps/playground/package.json`.
2. **Replace `packages/react/src/`** — keep a thin `index.ts` public export surface; add files as needed (`component.tsx`, `types.ts`, `styles.css`, …).
3. **Update the playground** (`apps/playground/src/App.tsx`) to demo your API variants.
4. **Rewrite e2e** (`e2e/*.spec.ts`) to assert your `data-testid` / roles.
5. `bun run build && bun run typecheck && bun run test:e2e`
6. When the API is stable, replace this README ([Write the public README](#write-the-public-readme)) and publish the playground ([GitHub Pages](#publish-the-playground-to-github-pages)).

For toast / modal / command-palette APIs that need `callFromAnywhere()`, an imperative module store + single mount point is a common pattern — optional, not baked into this stub.

## Dev loop

- **Default:** edit `packages/react/src` → `bun run build` → refresh playground (playground imports `dist`).
- **Faster iteration:** `bun run --filter @component-template/react dev` (tsup `--watch`) in one terminal, `bun run dev` in another.
- Alternatively, point Vite at package `src` via an alias if you prefer HMR without rebuilding `dist` — not configured by default to keep the publish path honest.

## Publishing the package

Only `packages/react` is meant for npm (`"files": ["dist"]`). Dual ESM/CJS + `.d.ts` via tsup; CSS exported as `@component-template/react/styles.css`. React stays a peer dependency.

The consumer README’s optional npm block (below) is what installers see. This section is how the tarball is built.

## Use as a GitHub Template

1. Push this repo to GitHub.
2. **Settings → General → Template repository** (check the box).
3. Others (or you) use **Use this template** to start a new component library.

## Write the public README

Replace this file once the component is done. The derived README is for people installing it. Follow the same order as [sidebar](https://github.com/Kaori2499/sidebar/blob/main/README.md) and [video-player](https://github.com/Kaori2499/video-player/blob/main/README.md):

- Title is the component name. The preview is the next thing in the file, then one paragraph.
- Centered preview, width about `920`, from `apps/playground/public/…`: a looping muted `<video>` (`autoplay` `muted` `loop` `playsinline`) or a wide `<img>` with `alt`. The demo sits above the pitch so it is on screen before Install.
- One-paragraph pitch, then **Live preview:** `https://<user>.github.io/<repo>/`.
- `## Install` — copy-paste `bunx --bun shadcn@latest add …`, and `@<scope>/…` after Pages has published the registry JSON.
- `## Usage` — minimal TSX, plus a props or variants table when the names need a line each.
- `## npm package (optional)` when the package is part of the story.
- `## Develop this repo` — `bun install`, `dev`, `build`, `typecheck`, `test:e2e`, and the registry scripts this repo actually has.
- `## License` and `## Credits`.

### Skeleton

````markdown
# <name>

<p align="center">
  <video
    src="./apps/playground/public/<clip>.mp4"
    width="920"
    autoplay
    muted
    loop
    playsinline
  />
</p>

One paragraph: what it is, the behavior that matters, and that you install one [shadcn registry](https://ui.shadcn.com/docs/registry) block (or the package).

**Live preview:** https://<user>.github.io/<repo>/

## Install

```bash
bunx --bun shadcn@latest add <user>/<repo>/<item>
```

Requires a shadcn/ui project (<Tailwind version, dependencies>). The block installs <where the files land>.

After GitHub Pages has published the registry JSON, you can also use:

```bash
bunx --bun shadcn@latest add @<scope>/<item>
```

(`@<scope>` → `https://<user>.github.io/<repo>/r/{name}.json` in this repo’s `components.json`.)

## Usage

```tsx
import { Component } from "@/components/<item>/<item>";

export function Example() {
  return <Component />;
}
```

| Prop | Role |
| --- | --- |
| `prop` | What it does |

## npm package (optional)

For the monorepo package without the CLI:

```bash
bun run build   # in this monorepo, or install from npm when published
```

```tsx
import { Component } from "@component-template/react";
import "@component-template/react/styles.css";
```

## Develop this repo

```bash
bun install
bun run dev          # playground at http://127.0.0.1:5173
bun run build        # packages/react → dist/
bun run typecheck
bun run test:e2e     # bunx playwright install chromium once
```

```bash
bun run registry:build   # apps/playground/public/r/*.json for Pages
```

## License

MIT — see [LICENSE](./LICENSE).

## Credits

- <source> — <what you used it for>
````

Swap the `<video>` for a still when a frame reads more clearly than motion. Same width, descriptive `alt`, same path rule (video-player):

```html
<p align="center">
  <img
    src="./apps/playground/public/<preview>.png"
    alt="What the still shows"
    width="920"
  />
</p>
```

Create `apps/playground/public/` when you add the file. The README path is relative (`./apps/playground/public/…`), which is how sidebar’s clip and video-player’s still resolve on GitHub. A second Usage snippet belongs in the file when you ship both a playground block and a lower-level composition (sidebar documents both). Point Usage imports at the registry install path (`@/components/…`). Keep the npm import on the package name you actually publish, and drop that section when there is no package to install.

`@<scope>` in `components.json` should be the Pages registry once `registry:build` writes `apps/playground/public/r/{name}.json` and the playground deploy ships it:

```json
{
  "registries": {
    "@<scope>": "https://<user>.github.io/<repo>/r/{name}.json"
  }
}
```

video-player maps `@video-player` that way (`https://kaori2499.github.io/video-player/r/{name}.json`). sidebar maps `@sidebar` at the raw GitHub file instead (`https://raw.githubusercontent.com/Kaori2499/sidebar/main/public/r/{name}.json`). Use the Pages URL when the JSON is part of the playground artifact. State the mapping in parentheses under the command, as both READMEs do.

Registry scripts differ by repo. Document the ones you added. video-player uses `sync:registry` and `registry:build` (output under `apps/playground/public/r/`). sidebar uses `registry:sync`, `registry:build`, and `registry:validate`.

Live preview links in those READMEs:

- https://kaori2499.github.io/sidebar/
- https://kaori2499.github.io/video-player/

## Publish the playground to GitHub Pages

Publish the Vite playground as a static site on each push to `main`. [video-player’s `pages.yml`](https://github.com/Kaori2499/video-player/blob/main/.github/workflows/pages.yml) is the workflow to copy. sidebar links a Pages URL of the same shape; that repo’s `.github/workflows/` currently contains `ci.yml` only.

[`.github/workflows/pages.yml.example`](./.github/workflows/pages.yml.example) is that workflow adjusted for this template. Actions only runs `*.yml` and `*.yaml`, so the example does not deploy. Copy it to `pages.yml` after the steps below.

### Before the first deploy

1. **Vite `base` for project Pages.** The site is `https://<user>.github.io/<repo-name>/`. In `apps/playground/vite.config.ts`:

   ```ts
   export default defineConfig({
     // https://<user>.github.io/<repo-name>/
     base: "/<repo-name>/",
     plugins: [react()],
   });
   ```

   A client router uses the same prefix (`basename="/<repo-name>/"`). With `base` set, the dev server is `http://127.0.0.1:5173/<repo-name>/`. This template leaves `base` unset so day-1 `bun run dev` stays on `/`.

2. **`build:playground`.** This template’s root `package.json` does not define it. Add the script video-player uses:

   ```json
   "build:playground": "bun run --filter playground build"
   ```

   The playground imports `@component-template/react` from `dist/`, so the workflow runs `bun run build` before `build:playground`. video-player aliases the playground at `packages/react/src` and omits the package build.

3. **Registry, when you have one.** Run `registry:build` before the playground build. Vite copies `apps/playground/public/` into `dist/`, which is how `https://<user>.github.io/<repo>/r/{name}.json` is on the site after deploy. The example leaves that step commented until the script exists.

4. **Pages source.** Settings → Pages → Build and deployment → Source: **GitHub Actions**.

5. Copy `pages.yml.example` to `.github/workflows/pages.yml` and push to `main`, or run the workflow with **workflow_dispatch**.

If the deploy job waits on the `github-pages` environment, approve it under Settings → Environments.

### What the workflow does

- **On:** `push` to `main`, and `workflow_dispatch`.
- **Permissions:** `contents: read`, `pages: write`, `id-token: write`.
- **Concurrency:** group `pages`, `cancel-in-progress: false`, so a deploy that has started is left to finish.
- **Build:** checkout, `oven-sh/setup-bun@v2`, `bun install --frozen-lockfile`, then (when you uncomment it) `bun run registry:build`, then `bun run build`, then `bun run build:playground`.
- **SPA fallback:** `cp apps/playground/dist/index.html apps/playground/dist/404.html`. Pages serves `404.html` for unknown paths. The copy is the built index, with `base` already applied, so client routes load under `/<repo-name>/`.
- **Deploy:** `actions/upload-pages-artifact@v3` with `path: apps/playground/dist`, then `actions/deploy-pages@v4` in the `github-pages` environment (`needs: build`).

`ci.yml` stays the install → build → typecheck → e2e workflow. `pages.yml` only builds the site and deploys it.

## License

MIT — see [LICENSE](./LICENSE).
