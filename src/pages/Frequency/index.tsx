import { Typography, Box, Grid, useMediaQuery, useTheme } from '@mui/material';

import { Header } from '../../components/Header';
import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';

function Frequency(){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = [
    { title: 'Chamada Geral' },
    { title: 'Tênius' },
    { title: 'Hidroginástica' },
    { title: 'Natação' },
    { title: 'Musculação' },
    { title: 'Spinning' },
    { title: 'Jump' },
    { title: 'Alongamento' },
    { title: 'Pilates' },
    { title: 'Yoga' },
    { title: 'Zumba' },
  ];

  return(
    <>
      <Header/>
      <Box maxWidth='max' padding='20px'>
        <Typography variant='h1' color='primary'
          paddingY={'20px'} 
          sx={{
            textAlign:{md:'left', xs: 'center'},
            fontSize:{md: 24, xs: 24},
            fontWeight: 'bold'
          }} >
          {pt.frequency.takeAttendance}
        </Typography>
        <Grid
          display={'grid'} 
          container 
          spacing={{xs: '8px'}}
          gridTemplateColumns= {isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}
        >
          {classes.map((c, key) => (<TextCard key={`${key}-${c.title}`} title={c.title} icon={'book'} theme={key == 0 ? 'dark' : 'light'}/>))}
        </Grid>
      </Box>
    </>
  );  
}

export default Frequency;