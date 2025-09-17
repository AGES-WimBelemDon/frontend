import { Edit } from '@mui/icons-material';
import { Box, Button, Input, MenuItem, Select, Typography, type SxProps } from '@mui/material';

import type { Activity } from './interface';
import { PageTitle } from '../../../components/PageTitle';
import { pt } from '../../../constants';

export default function ActivityList() {
  // mock para lista de atividades
  const activityList: Activity[] = [
    { id: 1, name: 'Atividade 1', teacher: 'John Doe', frequency: 'Mensal', area: 'Esporte' },
    { id: 2, name: 'Atividade 2', teacher: 'Jane Doe', frequency: 'Mensal', area: 'Culinaria' },
  ];

  const filterBoxStyle: SxProps = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: .5
  };

  return (
    <main>
      <PageTitle title={pt.activityList.title} dataCy='activity-list' />
      <Box gap={3} display={'flex'} mb={3}>
        <Box sx={filterBoxStyle}>
          <Typography>Nome</Typography>
          <Input sx={{ padding: 1 }} placeholder='Nome da Atividade' fullWidth />
        </Box>
        <Box sx={filterBoxStyle}>
          <Typography>Área</Typography>
          <Select fullWidth defaultValue='none'>
            <MenuItem value='none'>Selecione uma Área</MenuItem>
            <MenuItem value='esporte'>Esporte</MenuItem>
            <MenuItem value='culinaria'>Culinária</MenuItem>
          </Select>
        </Box>
        <Box sx={filterBoxStyle}>
          <Typography>Frequência</Typography>
          <Select fullWidth></Select>
        </Box>
      </Box>
      <Box display={'grid'} gridTemplateColumns={'repeat(3, 1fr)'} gap={3}>
        {activityList.length > 0 ? (
          activityList.map((activity) => (
            <Box
              key={activity.id}
              border={'1px solid'}
              borderColor={'grey.200'}
              padding={3}
              borderRadius={3}
            >
              <Box mb={1} display={'flex'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} variant='subtitle1'>
                  {activity.name}
                </Typography>
                <Button variant='contained' sx={{aspectRatio: '4/4', padding: .5}}><Edit sx={{width: .75}}/></Button>
              </Box>

              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='subtitle2' fontWeight={'bold'}>Área:</Typography>
                <Typography variant='subtitle2' fontWeight={'bold'} color='grey.500'>{activity.area}</Typography>
              </Box>
              <Box display={'flex'} gap={1} justifyContent={'space-between'}>
                <Typography variant='subtitle2' fontWeight={'bold'}>Frequência:</Typography>
                <Typography variant='subtitle2' fontWeight={'bold'} color='grey.500'>{activity.frequency}</Typography>
              </Box>
              <Box display={'flex'} gap={1} justifyContent={'space-between'}>
                <Typography variant='subtitle2' fontWeight={'bold'}>Professor:</Typography>
                <Typography variant='subtitle2' fontWeight={'bold'} color='grey.500'>{activity.teacher}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <p>Nenhuma atividade encontrada.</p>
        )}
      </Box>
    </main>
  );
}
