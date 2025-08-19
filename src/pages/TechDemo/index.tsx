import { useState } from 'react';

import { Button, Container, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';

import { pt } from '../../constants';

function TechDemo() {
  const navigate = useNavigate();

  const [remainingSeconds, setRemainingSeconds] = useState<number>(5);

  function goHome() {
    setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant='h1'>{pt.techDemo.title}</Typography>
        <Button onClick={goHome} variant="contained" color="primary">
          {pt.techDemo.goHomeButton({ time: remainingSeconds })}
        </Button>
      </Stack>
      <Outlet />
    </Container>
  );
}

export default TechDemo;
