import {
  Box,
  Divider,
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
import logo from "../../assets/logo.png";
import { strings } from "../../constants";
import type { ValidRoute } from "../../hooks/useRoutes";
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
    .filter(route => allowedRoutes.includes(route as ValidRoute)) as ValidRoute[];

  const sidebarWidth = getSidebarWidth(deviceSize) === "100%" ? "100%"
    : `${getSidebarWidth(deviceSize)}px`;

  const isSidebarOpen = sidebarState === "opened" || sidebarState === "opening";

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
      open={isSidebarOpen}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarOpen ? "center" : "flex-start",
          paddingY: 1.5,
          paddingX: 2,
          marginBottom: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 16,
          }}
        >
          <SidebarBurgerIcon 
            onToggle={toggleSidebar} 
            isOpen={isSidebarOpen}
            data-cy="sidebar-burger-icon"
            sx={{ 
              fontSize: 24,
              width: 24,
              height: 24,
            }}
          />
        </Box>
        {isSidebarOpen && (
          <Box
            component="img"
            src={logo}
            alt={strings.common.logoAlt}
            sx={{
              height: 35,
              width: 35,
            }}
          />
        )}
      </Box>
      
      {isSidebarOpen && (
        <Divider
          sx={{
            bgcolor: "primary.main",
            height: 2,
            width: "100%",
            marginBottom: 2,
          }}
        />
      )}

      <List sx={{ overflowY: "auto", marginTop: isSidebarOpen ? 0 : 2 }}>
        {visibleRoutes.map((route) => {
          const sidebarOptions = sidebarOptionsMapper[route];

          if (!sidebarOptions) {
            return null;
          }

          const { text, icon: Icon } = sidebarOptions;

          return (
            <ListItem key={route} disablePadding>
              <ListItemButton
                aria-label={strings.sidebar.listIcon({ to: route })}
                onClick={() => {
                  if (isMobile) {
                    toggleSidebar();
                  }
                  navigate(route);
                }}
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
