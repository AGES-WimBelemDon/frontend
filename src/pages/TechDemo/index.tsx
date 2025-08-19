import { useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router';

import './styles.css';

function TechDemo() {
  const { id } = useParams();
  const [searchParams] =  useSearchParams();
  const c2 = searchParams.get('c2');

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
    <div>
      <h1>Tech Demo {id}</h1>
      <p>c² = {c2}</p>
      <button onClick={goHome}>
        Go Home programmatically in {remainingSeconds} seconds.
      </button>
    </div>
  );
}

export default TechDemo;
