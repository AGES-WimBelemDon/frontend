import { Typography, Box, Stack, Button, Grid } from '@mui/material';

import { Header } from '../../components/header';

function Frequency(){
  return(
    <>
      <Header/>
      <Box maxWidth="max" padding='20px'>
        <Stack>
          <Typography variant='h1' color='primary'
            paddingY={'20px'} 
            sx={{
              textAlign:{md:'left', xs: 'center'},
              fontSize:{md: 24, xs: 24},
              fontWeight: 'bold'
            }} >
            Realizar Chamada
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(10)).map((_,index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Button variant="contained" >{'Turma ' + index + 1}</Button>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );  
}

export default Frequency;