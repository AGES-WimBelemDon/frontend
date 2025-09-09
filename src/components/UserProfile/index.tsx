import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import { useUserProfile } from './hook';

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
  } = useUserProfile();

  if (isMobile && !isSidebarOpened) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom={16}
      left={17}
      gap={1}
      display='flex'
      alignItems='center'
    >
      <Tooltip title={actionLabel}>
        <Box component='span'>
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
            overflow='hidden'
            display='-webkit-box'
            maxWidth={profileNameMaxWidth === '100%' ? '85%' : `${profileNameMaxWidth - 100}px`}
            sx={{
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
            }}
          >
            {displayedName}
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
}
