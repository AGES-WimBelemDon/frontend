import { Box, Button, Divider, List, Typography } from '@mui/material';

import { useFrequencyCall } from './hook/useFrequencyCall';
import { DataInput } from '../../components/DataInput';
import { FrequencyCard } from '../../components/FrequencyCard';
import type { FrequencyCardStudent } from '../../components/FrequencyCard/interface';

export function FrequencyCall() {
  const { students, updatePresence, registerCall } = useFrequencyCall();

  return (
    <Box
      sx={{
        width: '100%',
        height: '88vh',
        padding: 2.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        overflow: 'hidden'

      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: { md: 'left', xs: 'center' },
          paddingBottom: 4.5,
        }}
      >
        Realizar Chamada
      </Typography>

      <DataInput></DataInput>
      <Divider
        sx={{
          bgcolor: 'primary.main',
          height: 2,
          width: '100%',
        }}
      ></Divider>

      <List sx={{ width: '100%', height: '100%',marginTop: 2 , overflowY: 'auto', p:2}}>
        {students.map((item: FrequencyCardStudent) => (
          <FrequencyCard
            index={item.index}
            name={item.name}
            frequencyPercent={item.frequencyPercent}
            isPresent={item.isPresent}
            onChangePresence={(present) => updatePresence(item.index, present)}
          />
        ))}
      </List>

      <Box sx={{display: 'flex',justifyContent: 'end', alignItems: 'end', width: '100%', height: '15vh'}}>
        <List>
          <Button
            onClick={() => registerCall()}
            variant="contained"
            color="primary"
          >
            Salvar
          </Button>
        </List>
      </Box>
    </Box>
  );
}
