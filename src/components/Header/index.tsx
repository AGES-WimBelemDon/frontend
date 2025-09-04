import { Menu, AccountCircle } from '@mui/icons-material';
import { Box, ButtonBase, Divider, IconButton } from '@mui/material';

export function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          px: { xs: 2, md: 2.5 },
          py: { xs: 2.5, md: 1.5 },
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <IconButton
          aria-label="open sidebar"
          data-cy="header-sidebar-button"
          onClick={() => alert('open sidebar')}
        >
          <Menu
            sx={{
              fontSize: { xs: 30, md: 40 },
            }}
            color="primary"
          />
        </IconButton>
        <ButtonBase
          sx={{ borderRadius: '50%' }}
          focusRipple
          aria-label="go to home"
          data-cy="header-home-button"
          onClick={() => alert('go to home')}
        >
          <Box
            component="img"
            src="./logo.png"
            alt="WimBelemDon logo"
            sx={{
              height: { xs: 45, md: 60 },
              width: { xs: 45, md: 60 },
            }}
          />
        </ButtonBase>
        <IconButton
          aria-label="go to profile"
          data-cy="header-profile-button"
          onClick={() => alert('show profile')}
        >
          <AccountCircle
            sx={{
              fontSize: { xs: 30, md: 40 },
            }}
            color="primary"
          />
        </IconButton>
      </Box>
      <Divider
        variant="middle"
        sx={{
          bgcolor: 'primary.main',
          height: 2,
        }}
      />
    </>
  );
}