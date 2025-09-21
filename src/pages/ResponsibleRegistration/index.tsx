import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Typography,
  Stack,
  Button,
  Fab,
} from '@mui/material';

import { wbGreen, wbTeal, type Responsible } from './interface';
import { ResponsibleCard } from './ResponsibleCard';

export default function ResponsibleRegistration() {
  const [lista] = React.useState<Responsible[]>([
    {
      id: '1',
      nome: 'João Pedro Bauer',
      cpf: '012.345.678-90',
      nascimento: '08/08/1964',
      estadoCivil: 'Casado',
      nis: '123.4567890-1',
      telefone: '51-986027476',
      email: 'joaosigmund@gmail.com',
      endereco: 'Rua Portugal 245, Jardim Itu',
    },
  ]);

  function handleEdit(id: string) {
    console.log('editar', id);
  }

  return (
    <Box sx={{ px: 4, pb: 12 }}>
      {/* Título */}
      <Typography
        variant="h5"
        sx={{
          width: '100%',
          fontWeight: 700,
          fontSize: 32,
          color: '#196a6a',
          position: 'relative',
          pb: 1.25,
          mb: 5,
          '::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: -24,
            right: 0,
            height: 4,
            bgcolor: wbGreen,
            borderRadius: 5,
          },
        }}
      >
        Cadastro - Responsáveis
      </Typography>

      {/* 🔽 Tudo abaixo alinhado à esquerda */}
      <Box sx={{ maxWidth: 720 }}>
        {/* Subtítulo */}
        <Typography
          variant="h6"
          sx={{
            width: '100%',
            fontWeight: 1000,
            fontSize: 20,
            color: '#196a6a',
            position: 'relative',
            pb: 1.25,
            mb: 2,
            '::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: -16,
              width: '75%',
              height: 2,
              bgcolor: wbGreen,
              borderRadius: 5,
            },
          }}
        >
          Responsáveis Atuais
        </Typography>

        {/* Lista de cards */}
        <Stack spacing={2}>
          {lista.map((r) => (
            <ResponsibleCard key={r.id} data={r} onEdit={handleEdit} />
          ))}
        </Stack>

        {/* Botão "+" abaixo dos cards */}
        <Box sx={{ mt: 2 }}>
          <Fab
            aria-label="adicionar"
            sx={{
              width: 48,
              height: 48,
              minHeight: 'unset',
              bgcolor: '#FFFFFF',
              color: '#6AA653',
              borderRadius: 2,
              boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
              border: '2px solid #9AC77A',
              ':hover': { bgcolor: '#DCF0D4' },
            }}
            size="medium"
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      {/* Footer fixo */}
      <Box
        sx={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderRadius: 999,
            px: 3,
            py: 1,
            fontWeight: 700,
            borderWidth: 2,
            color: wbTeal,
            borderColor: wbTeal,
            ':hover': {
              borderWidth: 2,
              borderColor: '#0f5d5d',
              color: '#0f5d5d',
            },
          }}
          onClick={() => console.log('cancelar')}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            borderRadius: 999,
            px: 3,
            py: 1,
            fontWeight: 700,
            bgcolor: wbTeal,
            ':hover': { bgcolor: '#0f5d5d' },
          }}
          onClick={() => console.log('avançar')}
        >
          Avançar
        </Button>
      </Box>
    </Box>
  );
}