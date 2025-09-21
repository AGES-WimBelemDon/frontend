import React, { useState } from 'react';

//import { Person } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import {
  Card,
  CardContent,
  Typography,
  TextField
} from '@mui/material';

type StudentCardProps = {
  initialName: string;
  frequency: string;
};

const ButtonCadastro: React.FC<StudentCardProps> = ({ initialName }) => {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        mb: 2,
        width: 40,
        borderRadius: 2,
        height: 100,
        boxShadow: 1,
        paddingX: 16,
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#f2e9dd', 
          width: 80,
          height: 50,
          fontSize: 10,
        
        }}
      >
      </Avatar>
      <CardContent sx={{ flex: 1}}>
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
              {}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ButtonCadastro;