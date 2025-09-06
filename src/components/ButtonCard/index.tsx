import React, { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
} from '@mui/material';

type StudentCardProps = {
  initialName: string;
  frequency: string;
};

const ButtonCard: React.FC<StudentCardProps> = ({ initialName, frequency }) => {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<'present' | 'absent' | null>(null);

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        borderRadius: 2,
        boxShadow: 0,
        paddingX: 2,
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        {editing ? (
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            variant="standard"
            fullWidth
          />
        ) : (
          <>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ cursor: 'pointer', color: 'primary.main' }}
              onClick={() => setEditing(true)}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="black">
              {frequency}
            </Typography>
          </>
        )}
      </CardContent>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          onClick={() => setStatus('present')}
          sx={{
            width: 40,
            height: 40,
            bgcolor: status === 'present' ? 'secondary.main' : 'white',
            border: '1px solid lightgray',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <CheckIcon
            sx={{ color: status === 'present' ? 'primary.main' : 'gray' }}
          />
        </Box>
        <Box
          onClick={() => setStatus('absent')}
          sx={{
            width: 40,
            height: 40,
            bgcolor: status === 'absent' ? 'red' : 'white',
            border: '1px solid lightgray',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <CloseIcon sx={{ color: status === 'absent' ? 'black' : 'gray' }} />
        </Box>
      </Box>
    </Card>
  );
};

export default ButtonCard;