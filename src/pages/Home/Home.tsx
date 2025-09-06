import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

import logo from '/logo.png';
import { pt } from '../../constants';

export default function Home() {
  return (
    <Box
      sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Stack gap={3} textAlign="center">
        <Box
          component="img"
          src={logo}
          alt="WimBelemDon logo"
          height={300}
        />
        <Link to='/tech-demo' data-cy='tech-demo-nav-link'>
          <Typography variant="h2" fontWeight="bold" fontSize={24} color='white'>
            {pt.home.description}
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}
