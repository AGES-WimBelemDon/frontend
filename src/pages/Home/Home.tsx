import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

import logo from '/wbd-2021.png';
import { pt } from '../../constants';

function Home() {
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
        <Link to='/tech-demo'>
          <Typography variant="h2" fontWeight="bold" fontSize={24} color='white'>
            {pt.home.description}
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}

export default Home;
