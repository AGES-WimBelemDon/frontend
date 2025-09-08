import { Box, ButtonBase, Divider, Tooltip, Typography } from '@mui/material';

import { pt } from '../../constants';
import { useRoutes } from '../../hooks/useRoutes';

export function Header() {
  const { goTo } = useRoutes();

  return (
    <>
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, md: 2.5 },
          py: { xs: 2.5, md: 1.5 },
        }}
      >
        <Tooltip title={pt.header.goToHome} placement='right'>
          <ButtonBase
            focusRipple
            aria-label={pt.header.goToHome}
            data-cy="header-home-button"
            onClick={() => goTo('/')}
            sx={{ gap: 2, display: 'flex', paddingX: 6 }}
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