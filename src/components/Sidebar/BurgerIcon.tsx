import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import type { SidebarBurgerIconProps } from "./interface";
import { strings } from "../../constants";

export function SidebarBurgerIcon({ onToggle, sx }: SidebarBurgerIconProps) {
  return (
    <IconButton
      aria-label={strings.sidebar.openSidebar}
      data-cy="header-sidebar-button"
      onClick={onToggle}
      sx={{ maxWidth: "fit-content", ...sx }}
    >
      <Menu sx={{
        color: "primary.main",
        fontSize: 40,
      }} />
    </IconButton>
  );
}
