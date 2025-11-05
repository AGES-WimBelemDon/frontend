import { useState } from "react";

import { AccountCircle } from "@mui/icons-material";
import { Box, Button, CircularProgress, Divider, IconButton, List, ListItem, Typography } from "@mui/material";

import { useFrequencyCall } from "./hook";
import logo from "../../assets/logo.png";
import { FrequencyCard } from "../../components/FrequencyCard";
import type { FrequencyCardStudent } from "../../components/FrequencyCard/interface";
import { DateInput } from "../../components/Inputs/DateInput";
import { PageTitle } from "../../components/PageTitle";
import { SidebarBurgerIcon } from "../../components/Sidebar/BurgerIcon";
import { strings } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useSidebar } from "../../hooks/useSidebar";
import { loginWithGoogle, logout } from "../../services/auth.firebase";

export function FrequencyCall() {
  const {
    students,
    updatePresence,
    registerCall,
    activityTitle,
    classTitle,
  } = useFrequencyCall();

  const { isMobile } = useScreenSize();
  const { toggleSidebar, sidebarState } = useSidebar();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  if (!students) {
    return <Typography color="error">{strings.frequencyCall.studentsError}</Typography>;
  }

  const isSidebarOpen = sidebarState === "opened" || sidebarState === "opening";

  const handleSaveCall = async () => {
    setIsSaving(true);
    try {
      await registerCall();
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {isMobile && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingY: 1.5,
            paddingX: 2,
            marginBottom: 0,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
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
              data-cy="frequency-call-burger-icon"
              sx={{
                fontSize: 24,
                width: 24,
                height: 24,
              }}
            />
          </Box>
          <Box
            component="img"
            src={logo}
            alt={strings.common.logoAlt}
            sx={{
              height: 35,
              width: 35,
              marginLeft: "-2px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: 16,
            }}
          >
            <IconButton
              onClick={user ? handleSignOut : handleSignIn}
              data-cy="frequency-call-profile-button"
              aria-label={user ? strings.userProfile.logout : strings.userProfile.login}
              sx={{
                padding: 0,
              }}
            >
              <AccountCircle
                sx={{
                  fontSize: 32,
                  color: "primary.main",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      )}
      
      {isMobile && (
        <Divider
          sx={{
            bgcolor: "primary.main",
            height: 2,
            width: "100%",
            marginBottom: 2,
          }}
        />
      )}
      <Box sx={{ 
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        paddingBottom: { xs: 0, sm: 0 },
      }}>
        <PageTitle
          title={
            strings.frequencyCall.title({
              activity: activityTitle,
              classTitle: classTitle
            })}
          dataCy="frequency-call"
        />

        <DateInput id="1" label={strings.dateInput.selectDate}/>
        
        {!isMobile && (
          <Divider
            sx={{
              bgcolor: "primary.main",
              height: 2,
              width: "100%",
              marginTop: 2,
              marginBottom: 3,
            }}
          />
        )}

        <List sx={{
          width: "100%",
          paddingX: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginX: 0,
          marginBottom: 0,
          "& .MuiListItem-root": {
            paddingX: 0,
            paddingTop: 0,
            paddingBottom: 1.5,
          }
        }}>
          {students.map((item: FrequencyCardStudent) => (
            <ListItem key={item.id}>
              <FrequencyCard
                id={item.id}
                name={item.name}
                frequencyPercent={item.frequencyPercent}
                isPresent={item.isPresent}
                onChangePresence={(present) => updatePresence(item.id, present)}
              />
            </ListItem>
          ))}
        </List>

        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "flex-end", 
            alignItems: "center", 
            width: "100%", 
            paddingTop: 2,
            paddingBottom: { xs: 2, sm: 2 },
            marginTop: "auto",
            marginBottom: { xs: 10, sm: 0 },
          }}
        >
          <Button
            onClick={handleSaveCall}
            disabled={isSaving}
            data-cy="frequency-call-save-button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "600",
              fontSize: { xs: 14, sm: 15 },
              paddingX: { xs: 4, sm: 5 },
              paddingY: { xs: 1.2, sm: 1.4 },
              minWidth: { xs: "100%", sm: "160px" },
              boxShadow: 2,
              letterSpacing: "0.3px",
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: 3,
              },
              "&:disabled": {
                backgroundColor: "grey.400",
                color: "grey.600",
              },
              "&:focus-visible": {
                outline: "3px solid",
                outlineColor: "primary.light",
                outlineOffset: "2px",
              },
            }}
          >
            {isSaving ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              strings.frequencyCall.save
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
