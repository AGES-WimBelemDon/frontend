import HomeIcon from '@mui/icons-material/Home';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';

import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';
import { useToast } from '../../hooks/useToast';

export default function TechDemo() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  function showAPIInfo() {
    navigate('2?c2=4');
  }

  return (
    <Container maxWidth="md">
      <Typography variant='h1' data-cy="tech-demo-title">{pt.techDemo.title}</Typography>

      <hr />

      <Grid container spacing={2}>
        <TextCard
          title="Home"
          theme="dark"
          icon={<HomeIcon />}
          onClick={() => console.log('clicou')}
        />
        <TextCard
          title="Home"
          theme="light"
          icon={<HomeIcon />}
        />
      </Grid>

      <hr />

      <Button
        onClick={showAPIInfo}
        variant="contained"
        color="primary"
        data-cy="tech-demo-show-api-info-button"
      >
        <Typography variant='body1'>{pt.techDemo.showAPIInfo}</Typography>
      </Button>

      <hr />
      
      <Grid container spacing={2} marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-success-button"
          onClick={() => showToast('Teste de Toast', 'success')}
        >
          Abrir toast de SUCESSO!
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-error-button"
          onClick={() => showToast('Teste de Toast fechável', 'error', true)}
        >
          Abrir toast de ERRO!
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-info-button"
          onClick={() => showToast('Teste de Toast fechável', 'info', true)}
        >
          Abrir toast de INFO!
        </Button>
      </Grid>
      
      <Outlet />
    </Container>
  );
}
