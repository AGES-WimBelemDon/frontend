import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router';

import { pt } from '../../constants';
import { getTechDemo } from '../../services/tech-demo';

function Child() {
  const { id } = useParams();
  const [searchParams] =  useSearchParams();
  const c2 = searchParams.get('c2');

  const { isPending, error: apiError, data, isFetching } = useQuery({
    queryKey: ['techDemo', id],
    queryFn: getTechDemo,
  });

  if (isPending) {
    return (
      <CircularProgress />
    );
  }

  if (apiError) {
    return (
      <Typography color='error'>{pt.techDemo.child.apiError({ message: apiError.message })}</Typography>
    );
  }

  return (
    <Stack mt={4} spacing={2}>
      {c2 && <Typography variant='h1'>{pt.techDemo.child.detail({ c2 })}</Typography>}
      <Typography variant='h2'>{data.full_name}</Typography>
      <Typography variant='body1'>{data.description}</Typography>
      <Stack direction="row" spacing={4}>
        <Typography>👀 {data.subscribers_count}</Typography>
        <Typography>✨ {data.stargazers_count}</Typography>
        <Typography>🍴 {data.forks_count}</Typography>
      </Stack>
      {isFetching && <Typography mt={1}>{pt.techDemo.fetching}</Typography>}
    </Stack>
  );
}

export default Child;
