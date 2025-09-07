import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

import type { ButtonCardProps } from './interface';
import { pt } from '../../constants';

export function ButtonCard({ name, frequencyPercent,isPresent, onChangePresence }: ButtonCardProps) {

  return (
    <Card
      variant="outlined"
      sx={{
        gap: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2">
          {pt.buttonCard.frequency({ percent: frequencyPercent })}
        </Typography>
      </CardContent>
      <Box gap={2} display="flex" flexDirection="row">
        <Button
          onClick={() => {}}
          sx={{
            backgroundColor: 'gray',
            color: 'white',
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Adicionar Observação
          <AddIcon />
        </Button>
        <Button
          size="medium"
          color="success"
          variant={isPresent === true ? 'contained' : 'outlined'}
          onClick={() => onChangePresence(true)}
        >
          <CheckIcon />
        </Button>
        <Button
          size="medium"
          color="error"
          variant={isPresent === false ? 'contained' : 'outlined'}
          onClick={() => onChangePresence(false)}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Card>
  );
}
