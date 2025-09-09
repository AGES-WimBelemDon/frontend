import { Box, Button, Divider, List, ListItem, Typography } from '@mui/material';

import { useFrequencyCall } from './hook';
import { DateInput } from '../../components/DateInput';
import { FrequencyCard } from '../../components/FrequencyCard';
import type { FrequencyCardStudent } from '../../components/FrequencyCard/interface';
import { pt } from '../../constants';

export function FrequencyCall() {
  const { students, updatePresence, registerCall } = useFrequencyCall();

  return (
    <Box
      sx={{
        width: '100%',
        height: '88vh',
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
        {pt.frequencyCall.title}
      </Typography>

      <DateInput />
      <Divider
        sx={{
          bgcolor: 'primary.main',
          height: 2,
          width: '100%',
          marginY: 2,
        }}
      />

      <List sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto'
      }}>
        {students.map((item: FrequencyCardStudent) => (
          <ListItem key={item.id} sx={{ paddingX: 0 }}>
            <FrequencyCard
              id={item.id}
              name={item.name}
              frequencyPercent={item.frequencyPercent}
              isPresent={item.isPresent}
              onChangePresence={(present) => updatePresence(item.id, present)}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{display: 'flex',justifyContent: 'end', alignItems: 'end', width: '100%', height: '15vh'}}>
        <List>
          <Button
            onClick={() => registerCall()}
            variant="contained"
            color="primary"
          >
            {pt.frequencyCall.save}
          </Button>
        </List>
      </Box>
    </Box>
  );
}
