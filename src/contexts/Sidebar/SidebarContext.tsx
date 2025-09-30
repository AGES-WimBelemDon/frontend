import { createContext } from "react";

import type { DeviceSize } from "../../hooks/useScreenSize";

export type SidebarState = "closed" | "opening" | "opened" | "closing";

export type SidebarWidth = number | "100%";

type SidebarContextType = {
  sidebarState: SidebarState;
  toggleSidebar: () => void;
  getSidebarWidth: (deviceSize: DeviceSize) => SidebarWidth;
  sidebarAnimationDurationMs: number;
};

export const SidebarContext = createContext<SidebarContextType>({
  sidebarState: "closed",
  toggleSidebar: () => {},
  getSidebarWidth: () => 0,
  sidebarAnimationDurationMs: 500,
});
