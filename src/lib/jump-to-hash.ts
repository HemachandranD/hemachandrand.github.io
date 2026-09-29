/**
 * Same-page anchor jump as a real hash change, so :target, native
 * scrolling and `hashchange` listeners all see it — even when the hash
 * is already the current one.
 */
export function jumpToHash(hash: string) {
  if (window.location.hash === `#${hash}`) {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = hash;
  }
}
