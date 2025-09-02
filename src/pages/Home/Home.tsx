import { useRef } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import logo from '../../assets/logo.png';
import racket from '../../assets/tennis_racquet.png';
import racket_active from '../../assets/tennis_racquet_action.png';
import InteractableLogo from '../../components/InteractableLogo';
import { pt } from '../../constants';

function Home() {
  const navigate = useNavigate();
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  function handleLoginClick() {
    loginButtonRef.current?.click();
  }

  return (
    <Box
      sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}66, ${theme.palette.secondary.main}66)`,
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Stack gap={3} textAlign="center">
        <InteractableLogo
          src={logo}
          altText='Clique para preparar o saque!'
          defaultCursor={racket}
          activeCursor={racket_active}
          defaultSize={300}
          activeSize={50}
          moveSpeed={3}
          targetRef={loginButtonRef}
          onCollision={handleLoginClick}
        />
        <Button
          ref={loginButtonRef}
          data-cy='tech-demo-nav-link'
          onClick={() => navigate('/tech-demo')}
          variant='contained'
          sx={{ textTransform: 'none' }}
        >
          <Typography variant="h2" fontWeight="bold" fontSize={24} color='white'>
            {pt.home.description}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default Home;
