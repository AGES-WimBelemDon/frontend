import { Avatar, Box, Button, Card, CardContent, Grid, Stack } from '@mui/material';

import { InfoLine } from './InfoLine';
import type { ResponsibleCardProps } from './interface';

export function ResponsibleCard({
  data,
  onEdit,
}: ResponsibleCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        maxHeight: 210,
        borderRadius: 3,
        px: 1,
        py: 0.5,
        bgcolor: '#FAFAFA',
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item>
            <Avatar
              variant="rounded"
              sx={{
                width: 125,
                height: 150,
                bgcolor: '#E7EFE8',
                color: '#879C88',
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              {data.nome
                .split(' ')
                .slice(0, 2)
                .map((s) => s[0]?.toUpperCase())
                .join('')}
            </Avatar>
          </Grid>

          <Grid item xs>
            <Stack spacing={0.25}>
              <InfoLine label="Nome" value={data.nome} />
              <InfoLine label="CPF" value={data.cpf} />
              <InfoLine label="Nascimento" value={data.nascimento} />
              <InfoLine label="Estado Civil" value={data.estadoCivil} />
              <InfoLine label="NIS" value={data.nis} />
            </Stack>
          </Grid>

          <Grid item xs>
            <Stack spacing={0.25}>
              <InfoLine label="Telefone" value={data.telefone} />
              <InfoLine label="Email" value={data.email} />
              <InfoLine label="Endereço" value={data.endereco} />
            </Stack> 
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onEdit(data.id)}
            endIcon={<EditIcon fontSize="small" />}
            sx={{
              textTransform: 'none',
              borderRadius: 999,
              px: 1.5,
              py: 0.4,
              fontWeight: 700,
              bgcolor: wbTeal,
              ':hover': { bgcolor: '#0f5d5d' },
            }}
          >
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
