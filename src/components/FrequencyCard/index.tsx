import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';

import type { FrequencyCardProps } from './interface';
import { pt } from '../../constants';
import { theme } from '../../styles/theme';

export function FrequencyCard({
  name,
  frequencyPercent,
  isPresent,
  onChangePresence,
}: FrequencyCardProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        backgroundColor: 'background.default',
        width: '100%',
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize={isMobile ? 12 : 16}>
          {name}
        </Typography>
        <Typography variant="body2" fontSize={isMobile ? 10 : 14}>
          {pt.buttonCard.frequency({ percent: frequencyPercent })}
        </Typography>
      </CardContent>
      <Box gap={2} display="flex" flexDirection="row">
        <Button
          sx={{
            backgroundColor: 'grey.500',
            color: 'white',
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          size={isMobile ? 'small' : 'medium'}
        >
          {isMobile ? '' : 'Adicionar Observação'}
          <AddIcon />
        </Button>
        <Button
          size={isMobile ? 'small' : 'medium'}
          color="success"
          variant={isPresent === true ? 'contained' : 'outlined'}
          onClick={() => onChangePresence(true)}
        >
          <CheckIcon />
        </Button>
        <Button
          size={isMobile ? 'small' : 'medium'}
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
