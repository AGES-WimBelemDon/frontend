import { useEffect } from "react";

import { Box, CircularProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

import { useLayout } from "./useLayout";
import { ClassesModal } from "../../components/ClassesModal";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Toast } from "../../components/Toast";
import { UserProfile } from "../../components/UserProfile";
import { useRoutes } from "../../hooks/useRoutes";

export default function Layout() {
  const { allowedRoutes } = useRoutes();
  const { isVerifying } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    function onUnauthorized(event: Event) {
      const custom = event as CustomEvent<{ loginPath?: string }>; 
      const loginPath = custom?.detail?.loginPath;
      if (!loginPath) {
        return;
      }
      const path = loginPath.replace(/^\/frontend\/?/, "");
      navigate(path, { replace: true });
    }
    window.addEventListener("app:unauthorized", onUnauthorized as EventListener);
    
    return () => window.removeEventListener("app:unauthorized", onUnauthorized as EventListener);
  }, [navigate]);

  return (
    <Box display="flex" height="100vh">
      <Sidebar allowedRoutes={allowedRoutes} />

      <UserProfile />

      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Header />
        
        {isVerifying ? (
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            component="main"
            flex="1"
            overflow="auto"
            width="100%"
            maxWidth="lg"
            padding={2}
            paddingBottom={10}
            marginX="auto"
          >
            <Toast />
            <ClassesModal />
            <Outlet />
          </Box>
        )}
      </Box>
    </Box>
  );
}
