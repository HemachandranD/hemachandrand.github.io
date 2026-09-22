import { createContext, useContext } from "react";

// App-wide overlays (contact sheet, spotlight) live in App so any page
// or the spotlight palette itself can open them.
export const UIContext = createContext({
    openContact: () => { },
    openSpotlight: () => { },
});

export const useUI = () => useContext(UIContext);
