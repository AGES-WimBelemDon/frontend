import { Box, ButtonBase, Divider, Tooltip, Typography } from '@mui/material';

import logo from '../../assets/logo.png';
import { pt } from '../../constants';
import { useRoutes } from '../../hooks/useRoutes';
import { useScreenSize } from '../../hooks/useScreenSize';
import { useSidebar } from '../../hooks/useSidebar';
import { SidebarBurgerIcon } from '../Sidebar/BurgerIcon';

export function Header() {
  const { goTo } = useRoutes();
  const { isMobile } = useScreenSize();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <Box
        component='header'
        position='relative'
        display='flex'
        justifyContent='center'
        px={{ xs: 2, md: 2.5 }}
        py={{ xs: 2.5, md: 1.5 }}
      >
        {isMobile && (
          <SidebarBurgerIcon
            onToggle={toggleSidebar}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        )}
        <Tooltip title={pt.header.goToHome} placement='right'>
          <ButtonBase
            focusRipple
            aria-label={pt.header.goToHome}
            data-cy="header-home-button"
            onClick={() => goTo('/')}
            sx={{
              gap: 2,
              display: 'flex',
              paddingX: isMobile ? 0 : 6
            }}
          >
            <Box
              component="img"
              src={logo}
              alt={pt.header.logoAlt}
              sx={{
                height: { xs: 45, md: 60 },
                width: { xs: 45, md: 60 },
              }}
            />
            <Typography
              variant="h1"
              fontSize={{ xs: 20, md: 30 }}
              fontWeight='bold'
            >
              WimBelemDon+
            </Typography>
          </ButtonBase>
        </Tooltip>
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