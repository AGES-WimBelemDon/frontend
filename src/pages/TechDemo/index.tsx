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
      
      <Button
        variant="contained"
        color="primary"
        data-cy="tech-demo-show-api-info-button"
        onClick={() => showToast('Teste de Toast', 'success') }
      >
        Abrir TOAST!
      </Button>

      <Outlet />
    </Container>
  );
}
