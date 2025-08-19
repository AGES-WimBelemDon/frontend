import { Box, Stack, Typography } from '@mui/material';

import logo from '/wbd-2021.png';
import { Link } from 'react-router';

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
        <Link to={'/tech-demo/1'}>
          <Typography variant="h2" fontWeight="bold" fontSize={24} color='white'>
            Em Desenvolvimento
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}

export default Home;
