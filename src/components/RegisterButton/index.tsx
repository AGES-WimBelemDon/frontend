import React, { useState } from 'react';

import { Avatar } from '@mui/material';
import {
  Card,
  CardContent,
  Typography,
  TextField
} from '@mui/material';
import { Divider } from '@mui/material';

type StudentCardProps = {
  initialName: string;
  frequency: string;
};

const ButtonCadastro: React.FC<StudentCardProps> = ({ initialName }) => {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  return (
    <>
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        width: 0.20,
        borderRadius: 2,
        height: 100,
        boxShadow: 1,
        paddingX: 1,
        bgcolor: 'white'
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#f2e9dd', 
          width: 0.3,
          height: 0.8,
          fontSize: 10,
          borderRadius: 2,
        }}
      >
      </Avatar>
      <CardContent sx={{ flex: 1, pl: 5}}>
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
              sx={{ cursor: 'pointer', color: '#0E6872' }}
              onClick={() => setEditing(true)}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="black">
              {}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
      {/* <Divider variant='middle' /> */}
      <Divider sx={{ bgcolor: '#8DC740', width: 0.205  , display: 'flex', justifyContent: 'center', mb: 1.5 }}/>
    </>
  );
};

export default ButtonCadastro;