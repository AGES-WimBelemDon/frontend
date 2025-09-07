import { Menu } from '@mui/icons-material';
import { Box, ButtonBase, Divider, IconButton } from '@mui/material';

import { UserProfile } from './UserProfile';
import { pt } from '../../constants';

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
          aria-label={pt.header.openSidebar}
          data-cy="header-sidebar-button"
          onClick={() => alert(pt.header.openSidebar)}
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
          aria-label={pt.header.goToHome}
          data-cy="header-home-button"
          onClick={() => alert(pt.header.goToHome)}
        >
          <Box
            component="img"
            src="./logo.png"
            alt={pt.header.logoAlt}
            sx={{
              height: { xs: 45, md: 60 },
              width: { xs: 45, md: 60 },
            }}
          />
        </ButtonBase>
        <UserProfile />
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