import { useState } from 'react';

import { Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import { getTechDemo } from '../../services/tech-demo';

function TechDemo() {
  const { id } = useParams();
  const [searchParams] =  useSearchParams();
  const c2 = searchParams.get('c2');

  const navigate = useNavigate();

  const { isPending, error: apiError, data, isFetching } = useQuery({
    queryKey: ['techDemo', id],
    queryFn: getTechDemo,
  });

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

  if (isPending) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant='h1'>Tech Demo {id}</Typography>
        <Typography variant='body1'>c² = {c2}</Typography>
        <Button onClick={goHome} variant="contained" color="primary">
          Go Home programmatically in {remainingSeconds} seconds.
        </Button>
      </Stack>
      {!apiError ? (
        <Stack mt={4} spacing={2}>
          <Typography variant='h2'>{data.full_name}</Typography>
          <Typography variant='body1'>{data.description}</Typography>
          <Stack direction="row" spacing={4}>
            <Typography>👀 {data.subscribers_count}</Typography>
            <Typography>✨ {data.stargazers_count}</Typography>
            <Typography>🍴 {data.forks_count}</Typography>
          </Stack>
          {isFetching && <Typography mt={1}>Updating...</Typography>}
        </Stack>
      ) : (
        <Typography color='error'>API Error: {apiError.message}</Typography>
      )}
    </Container>
  );
}

export default TechDemo;
