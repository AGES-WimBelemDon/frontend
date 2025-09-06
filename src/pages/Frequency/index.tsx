import { Typography, Box, Grid, useMediaQuery, useTheme } from '@mui/material';

import { TextCard } from '../../components/TextCard';
import { pt } from '../../constants';

function Frequency(){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const activities = [
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
    <Box maxWidth='max' padding={2.5}>
      <Typography variant='h1'
        paddingY={2.5}
        sx={{
          textAlign: { md: 'left', xs: 'center' },
          fontSize: 24,
          fontWeight: 'bold'
        }}
      >
        {pt.frequency.takeAttendance}
      </Typography>
      <Grid
        display='grid'
        container
        spacing={{ xs: 1 }}
        gridTemplateColumns={isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}
      >
        {activities.map((c, index) => (
          <TextCard
            key={`${index}-${c.title}`}
            title={c.title}
            icon='book'
            theme={index === 0 ? 'dark' : 'light'}
          />
        ))}
      </Grid>
    </Box>
  );  
}

export default Frequency;