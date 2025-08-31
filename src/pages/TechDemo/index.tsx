import HomeIcon from '@mui/icons-material/Home';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';

import UserProfile from './Profile';
import { pt } from '../../constants';
import { theme } from '../../styles/theme';
import { GenericCard } from '../../ui/custom/GenericCard';

function TechDemo() {
  const navigate = useNavigate();

  function showAPIInfo() {
    navigate('2?c2=4');
  }

  return (
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
      </Stack>
      <UserProfile />

      <GenericCard
        title="Home"
        type="list"
        theme="dark"
        icon={<HomeIcon sx={{ color: 'white' }} fontSize="large" />}
        titleProps={{ color: 'white', fontWeight: 'bold' }}
        descriptionProps={{ color: 'black', fontWeight: 'semibold' }}
        titleVariant="h5"
      ></GenericCard>

      <GenericCard
        title="Nome do Aluno"
        type="default"
        description="Frequência: 90(9/10)"
        theme="light"
        titleProps={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
        descriptionProps={{ color: 'black', fontWeight: 'semibold' }}
        titleVariant="h5"
      ></GenericCard>

      <Outlet />
    </Container>
  );
}

export default TechDemo;
