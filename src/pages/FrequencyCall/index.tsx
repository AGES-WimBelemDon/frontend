import { Box, Button, Divider, Input, List, Typography } from '@mui/material';

import { useFrequencyCall } from './hook/useFrequencyCall';
import { FrequencyCard } from '../../components/FrequencyCard';
import type { FrequencyCardStudent } from '../../components/FrequencyCard/interface';

export function FrequencyCall() {
  const { students, updatePresence } = useFrequencyCall();

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

      <Input type=""></Input>
      <Box>
        
      </Box>
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
            onClick={() => {
              console.log(students);
            }}
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
