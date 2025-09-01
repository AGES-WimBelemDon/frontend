import { Menu, AccountCircle } from '@mui/icons-material';
import { Box, Container, Divider } from '@mui/material';

export default function Header() {
  return (
    <Container maxWidth='xl'>
      <Box
        component='header'
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          px: {md:'none', xs:'20px'},
          py: '20px',
          backgroundColor: 'background.paper',
          alignItems: 'center',
          justifyItems: 'center',
          width: {md: 1}
        }}
      >
        <Menu
          sx={{ 
            cursor: 'pointer',
            //display: { md: 'none' },
            height: { md: 40 , xs:30 }, 
            width: { md: 40 , xs:30 }, 
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
            //display: { md: 'none' },
            height: { md: 50 , xs:30 }, 
            width: { md: 50 , xs:30 }, 
          }}
        />
        <AccountCircle
          sx={{ 
            cursor: 'pointer',

            height: { md: 40 , xs:30 }, 
            width: { md: 40 , xs:30 }, 
          }}
          color='primary'
          onClick={() => alert('show profile')}
          
        />
        
      </Box>
      <Divider 
        variant='middle' 
        sx={{
          bgcolor: 'primary.main',
          height: 2,
        }}
      />
    </Container>
  );
}