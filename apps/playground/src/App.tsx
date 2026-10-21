import { toast, Toaster } from "@component-template/react";

export function App() {
  return (
    <main className="page">
      <h1>component-template playground</h1>
      <p>Kitchen sink for the toast API — click through each action.</p>

      <div className="row">
        <button type="button" onClick={() => toast("Hello from toast()")}>
          Default toast
        </button>
        <button type="button" onClick={() => toast.success("Saved")}>
          Success toast
        </button>
        <button type="button" onClick={() => toast.error("Something failed")}>
          Error toast
        </button>
        <button type="button" onClick={() => toast.dismiss()}>
          Dismiss all
        </button>
      </div>

      <Toaster />
    </main>
  );
}