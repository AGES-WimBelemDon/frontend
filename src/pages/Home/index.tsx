import HomeIcon from '@mui/icons-material/Home';
import { Box, Stack, Typography, Divider } from '@mui/material';

import { TextCard } from '../../components/TextCard';
import { useAuth } from '../../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        background: '#fff',
        width: '81%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 0,
        py: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          ml: { xs: 2.5, md: 5.5 },
          mt: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary.main"
          textAlign="center"
          sx={{ mt: 1 }}
        >
          Bem vindo(a) de volta
          <br />
          <span style={{ fontWeight: 400, fontSize: 20 }}>
            {user?.displayName ? user.displayName : '<Username>'}!
          </span>
        </Typography>
        <Divider sx={{ bgcolor: 'light', my: 2, width: '100%' }} />
        <Stack spacing={4} width="100%" alignItems="center">
          <Box width="100%" maxWidth={420} height={120}>
            <TextCard
              title="Realizar Chamada"
              icon={<HomeIcon fontSize="large" />}
              theme="light"
              onClick={() => {}}
            />
          </Box>
          <Box width="100%" maxWidth={420} height={120}>
            <TextCard
              title="Gerenciar Turmas"
              icon={<HomeIcon fontSize="large" />}
              theme="light"
              onClick={() => {}}
            />
          </Box>
          <Box width="100%" maxWidth={420} height={120}>
            <TextCard
              title="Gerenciar Alunos"
              icon={<HomeIcon fontSize="large" />}
              theme="light"
              onClick={() => {}}
            />
          </Box>
          <Box width="100%" maxWidth={420} height={120}>
            <TextCard
              title="Atividades"
              icon={<HomeIcon fontSize="large" />}
              theme="light"
              onClick={() => {}}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
