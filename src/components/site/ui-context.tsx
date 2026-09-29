"use client";

import { createContext, useContext } from "react";

// App-wide overlays live in the providers so any page, the header, the
// dock or the command menu itself can open them.
export type UIContextValue = {
  openContact: () => void;
  openCommand: () => void;
};

export const UIContext = createContext<UIContextValue>({
  openContact: () => {},
  openCommand: () => {},
});

export const useUI = () => useContext(UIContext);
