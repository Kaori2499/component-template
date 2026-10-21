import { useState } from "react";
import { Button } from "@component-template/react";

export function App() {
  const [clicks, setClicks] = useState(0);

  return (
    <main className="page">
      <h1>Component preview</h1>
      <p className="lede">
        Playground for <code>@component-template/react</code>. Swap the stub
        component in <code>packages/react</code>, rebuild, and preview variants
        here.
      </p>

      <section className="demo" aria-label="Button variants">
        <h2>Button</h2>
        <div className="row">
          <Button data-testid="button-default">Default</Button>
          <Button variant="primary" data-testid="button-primary">
            Primary
          </Button>
          <Button disabled data-testid="button-disabled">
            Disabled
          </Button>
          <Button
            variant="primary"
            data-testid="button-clickable"
            onClick={() => setClicks((n) => n + 1)}
          >
            Click me
          </Button>
        </div>
        <p data-testid="click-count" className="meta">
          Clicks: {clicks}
        </p>
      </section>
    </main>
  );
}
