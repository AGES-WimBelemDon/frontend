import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';

import type { RegisterButtonProps } from './interface';

export function RegisterButton({ title }: RegisterButtonProps) {
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
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
      <Divider sx={{
        bgcolor: '#8DC740',
        width: 0.205,
        display: 'flex',
        justifyContent: 'center',
        mb: 1.5
      }} />
    </>
  );
};
