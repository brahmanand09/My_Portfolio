"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** `false` during SSR/hydration, `true` once running in the browser. */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
