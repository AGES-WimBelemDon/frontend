import { AccountCircle, Language } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, Button } from "@mui/material";

import { useUserProfile } from "./hook";
import { strings } from "../../constants";

export function UserProfile() {
  const {
    actionLabel,
    user,
    handleSignOut,
    handleSignIn,
    isLoadingAuth,
    showProfileName,
    displayedName,
    isMobile,
    isSidebarOpened,
    profileNameMaxWidth,
    currentLocale,
    handleLanguageToggle,
  } = useUserProfile();

  if (isMobile && !isSidebarOpened) {
    return null;
  }

  return (
    <>
      <Box
        position="fixed"
        bottom={16}
        left={17}
        gap={1}
        display="flex"
        alignItems="center"
      >
        <Tooltip title={actionLabel}>
          <Box component="span">
            <IconButton
              aria-label={actionLabel}
              data-cy="header-profile-button"
              onClick={user ? handleSignOut : handleSignIn}
              loading={isLoadingAuth}
              disabled={isLoadingAuth}
            >
              <AccountCircle
                sx={{ fontSize: 40 }}
                color="primary"
              />
            </IconButton>
          </Box>
        </Tooltip>
        {showProfileName && (
          <Tooltip title={displayedName}>
            <Typography
              variant="body1"
              fontWeight="bold"
              overflow="hidden"
              display="-webkit-box"
              maxWidth={profileNameMaxWidth === "100%" ? "85%" : `${profileNameMaxWidth - 100}px`}
              sx={{
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                wordBreak: "break-word",
              }}
            >
              {displayedName}
            </Typography>
          </Tooltip>
        )}
      </Box>

      <Box
        position="fixed"
        bottom={16}
        right={16}
        zIndex={1000}
      >
        <Tooltip title={currentLocale === "pt-BR" ? strings.userProfile.switchToEnglish : strings.userProfile.switchToPortuguese}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleLanguageToggle}
            startIcon={<Language />}
            sx={{
              minWidth: "auto",
              px: 1,
              py: 0.5,
              fontSize: "12px",
              textTransform: "none",
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: "background.default",
              },
            }}
          >
            {currentLocale === "pt-BR" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </Button>
        </Tooltip>
      </Box>
    </>
  );
}
