import { Box, Button, Divider, List, ListItem, Typography } from '@mui/material';

import { useFrequencyCall } from './hook';
import { DateInput } from '../../components/Inputs/DateInput';
import { FrequencyCard } from '../../components/FrequencyCard';
import type { FrequencyCardStudent } from '../../components/FrequencyCard/interface';
import { PageTitle } from '../../components/PageTitle';
import { pt } from '../../constants';

export function FrequencyCall() {
  const {
    students,
    updatePresence,
    registerCall,
    activityTitle,
    classTitle,
  } = useFrequencyCall();

  if (!students) {
    return <Typography color='error'>{pt.frequencyCall.studentsError}</Typography>;
  }

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
      <PageTitle
        title={
          pt.frequencyCall.title({
            activity: activityTitle,
            classTitle: classTitle
          })}
        dataCy='frequency-call'
      />

      <DateInput id='1' />
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

      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', width: '100%', height: '15vh' }}>
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
