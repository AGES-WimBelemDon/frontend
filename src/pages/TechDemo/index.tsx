import { Button, Container, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';

import UserProfile from './Profile';
import Header from '../../components/header';
import { pt } from '../../constants';
import { useToast } from '../../hooks/useToast';

function TechDemo() {
  const navigate = useNavigate();
  const {showToast} = useToast();

  function showAPIInfo() {
    navigate('2?c2=4');
  }

  return (
    <Container>
      <Header />
      <Container maxWidth="sm">
        <Stack>
          <Typography variant="h1" data-cy="tech-demo-title">
            {pt.techDemo.title}
          </Typography>
          <Button
            onClick={showAPIInfo}
            variant="contained"
            color="primary"
            data-cy="tech-demo-show-api-info-button"
          >
            <Typography variant="body1">{pt.techDemo.showAPIInfo}</Typography>
          </Button>

          <Button
            variant="contained"
            color="primary"
            data-cy="tech-demo-show-api-info-button"
            onClick={() => showToast('Teste de Toast', 'success') }
          >
            Abrir TOAST!
          </Button>
        </Stack>
        <UserProfile />
        <Outlet />
      </Container>
    </Container>
  );
}

export default TechDemo;
