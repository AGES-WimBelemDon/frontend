import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";

import { SidebarBurgerIcon } from "./BurgerIcon";
import { sidebarOptionsMapper, type SidebarProps } from "./interface";
import { pt } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useSidebar } from "../../hooks/useSidebar";

export function Sidebar({ allowedRoutes }: SidebarProps) {
  const navigate = useNavigate();
  const { deviceSize, isMobile } = useScreenSize();
  const {
    sidebarState,
    toggleSidebar,
    getSidebarWidth,
    sidebarAnimationDurationMs,
  } = useSidebar();

  const visibleRoutes = Object.keys(sidebarOptionsMapper)
    .filter(route => allowedRoutes.includes(route));

  const sidebarWidth = getSidebarWidth(deviceSize) === "100%" ? "100%"
    : `${getSidebarWidth(deviceSize)}px`;

  if (isMobile && (sidebarState === "closed" || sidebarState === "closing")) {
    return <></>;
  }

  return (
    <Drawer
      component="nav"
      sx={{
        width: sidebarWidth,
        zIndex: 0,
        overflow: "hidden",
        transition: `${sidebarAnimationDurationMs}ms all ease`,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          padding: 2,
          overflow: "hidden",
          boxSizing: "border-box",
          boxShadow: "1px 0px 5px background.paper",
          transition: `${sidebarAnimationDurationMs}ms all ease`,
          backgroundColor: "background.default",
        },
      }}
      variant="permanent"
      anchor="left"
      open={sidebarState === "opened" || sidebarState === "opening"}
    >
      <SidebarBurgerIcon onToggle={toggleSidebar} />

      <List sx={{ overflowY: "auto" }}>
        {visibleRoutes.map((route) => {
          const { text, icon: Icon } = sidebarOptionsMapper[route];

          return (
            <ListItem key={route} disablePadding>
              <ListItemButton
                aria-label={pt.sidebar.listIcon({ to: route })}
                onClick={() => {
                  if (isMobile) {
                    toggleSidebar();
                  }
                  navigate(route);
                }}
                disabled={sidebarOptionsMapper[route].disabled}
                sx={{
                  backgroundColor: "grey.100",
                  borderRadius: ".7em",
                  padding: ".7em 1em",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: "1em",
                  ":hover": {
                    backgroundColor: "background.paper"
                  }
                }}
              >
                <ListItemIcon sx={{ color: "primary.main", minWidth: "fit-content" }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: "bold",
                      textWrap: "nowrap",
                      overflow: "hidden",
                      marginLeft: "1em"
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
