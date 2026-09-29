/** Run `cb` when the main thread is idle (Safari: shortly after). Returns a cancel function. */
export function onIdle(cb: () => void, timeout = 2000): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(cb, 300);
  return () => window.clearTimeout(id);
}
