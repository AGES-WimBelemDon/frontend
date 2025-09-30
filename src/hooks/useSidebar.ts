import { useContext } from "react";

import { SidebarContext } from "../contexts/Sidebar/SidebarContext";

export function useSidebar() {
  return useContext(SidebarContext);
}
