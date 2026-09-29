import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** "⌘" on Apple devices, "Ctrl" elsewhere. Prerendered as "⌘". */
export function useModKey() {
  return useSyncExternalStore(
    subscribe,
    () => (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? "⌘" : "Ctrl "),
    () => "⌘",
  );
}
