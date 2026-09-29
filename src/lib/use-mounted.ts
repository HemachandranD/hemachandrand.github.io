import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False during prerender and hydration, true after — without a re-render effect. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
