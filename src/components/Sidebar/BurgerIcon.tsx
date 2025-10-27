import { Menu, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import type { SidebarBurgerIconProps } from "./interface";
import { strings } from "../../constants";

export function SidebarBurgerIcon({ onToggle, isOpen, sx }: SidebarBurgerIconProps) {
  return (
    <IconButton
      aria-label={isOpen ? strings.sidebar.closeSidebar : strings.sidebar.openSidebar}
      data-cy="header-sidebar-button"
      onClick={onToggle}
      sx={{ maxWidth: "fit-content", ...sx }}
    >
      {isOpen ? (
        <Close sx={{
          color: "primary.main",
          fontSize: 20,
          width: 20,
          height: 20,
        }} />
      ) : (
        <Menu sx={{
          color: "primary.main",
          fontSize: 40,
        }} />
      )}
    </IconButton>
  );
}
