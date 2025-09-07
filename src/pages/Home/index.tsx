import { Box, Typography, Divider } from '@mui/material';

import CardList from '../../components/CardList';
import { TextCard } from '../../components/TextCard';
import { useAuth } from '../../hooks/useAuth';

const cards = [
  { title: 'Realizar Chamada' },
  { title: 'Gerenciar Turmas' },
  { title: 'Gerenciar Alunos' },
  { title: 'Atividades' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        width: '90%',      
        maxWidth: 1100,     
        mx: 'auto',      
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: 2,
        py: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
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
          textAlign="center"
          sx={{ mt: 1 }}
        >
          Bem vindo(a) de volta
          <br />
          <span style={{ fontWeight: 400, fontSize: 20 }}>
            {user?.displayName ?? '<Username>'}!
          </span>
        </Typography>

        <Divider sx={{ bgcolor: 'light', my: 2, width: '100%' }} />

        <CardList>
          {cards.map((card) => (
            <TextCard
              key={card.title}
              title={card.title}
              theme="light"
              onClick={() => {}}
            />
          ))}
        </CardList>

      </Box>
    </Box>
  );
}
