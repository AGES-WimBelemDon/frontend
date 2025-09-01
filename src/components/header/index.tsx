import { Menu, AccountCircle } from '@mui/icons-material';
import { Box, Divider } from '@mui/material';

export default function Header() {
  return (
    <Box>
      <Box
        component='header'
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          padding: '20px',
          backgroundColor: 'background.paper',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <Menu
          sx={{ 
            cursor: 'pointer',
            display: { md: 'none' },
            height: 30,
            width: 30, 
          }}
          color='primary'
          onClick={() => alert('open sidebar')}
        />
        <Box
          component='img'
          src='./logo.png'
          alt='WimBelemDon logo'
          onClick={() => alert('go to home')}
          sx={{ 
            cursor: 'pointer',
            display: { md: 'none' },
            height: 30,
            width: 30, 
          }}
        />
        <AccountCircle
          sx={{ 
            cursor: 'pointer',
            display: { md: 'none' },
            height: 30,
            width: 30, 
          }}
          color='primary'
          onClick={() => alert('show profile')}
          
        />
        
      </Box>
      <Divider 
        variant='middle' 
        sx={{
          display: { md: 'none' },
          bgcolor: 'primary.main',
          height: 2,
        }}
      />
    </Box>
  );
}