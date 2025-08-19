import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import './styles.css';
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tech Demo {id}</h1>
      <p>c² = {c2}</p>
      <button onClick={goHome}>
        Go Home programmatically in {remainingSeconds} seconds.
      </button>

      {!apiError ? (
        <div>
          <h1>{data.full_name}</h1>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{' '}
          <strong>✨ {data.stargazers_count}</strong>{' '}
          <strong>🍴 {data.forks_count}</strong>
          <div>{isFetching ? 'Updating...' : ''}</div>
        </div>
      ) : (
        <div>API Error: {apiError.message}</div>
      )}
    </div>
  );
}

export default TechDemo;
