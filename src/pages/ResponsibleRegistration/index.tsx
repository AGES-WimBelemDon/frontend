import { Typography } from '@mui/material';

export default function ResponsibleRegistration() {
  return (
    <>
      {/* <h1
          style={{
            position: 'relative',
            fontSize: 32,
            fontWeight: 700,
            color: '#196a6a',
            paddingBottom: 8,
            margin: '0 0 16px 0',
          }}
        >
          Cadastro – Responsáveis
          <span
            style={{
              position: 'absolute',
              left: -1,   // quanto quer avançar à esquerda
              right: 0,    // encosta no fim à direita
              bottom: 0,   // encosta no fim embaixo
              height: 4,
              background: '#9AC77A',
              borderRadius: 10,
              display: 'block',
            }}
          />
        </h1> */}
      <Typography
        variant="h5"
        sx={{
          width: '100%',
          fontWeight: 700,
          fontSize: 32,
          color: '#196a6a',
          textAlign: 'left',
          position: 'relative',   
          pb: 1.25,               
          mb: 5,                  
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: -24,            
            right: 0,             
            height: 4,            
            backgroundColor: '#9AC77A',
            borderRadius: 5,
          },
        }}
      >
      Cadastro – Responsáveis
      </Typography>
      <Typography
        variant="h6"
        sx={{
          width: '100%',
          fontWeight: 1000,
          fontSize: 20,
          color: '#196a6a',
          textAlign: 'left',
          position: 'relative',   
          pb: 1.25,               
          mb: 2,                  
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: -16,            
            right: 600,           
            height: 2,            
            backgroundColor: '#9AC77A',
            borderRadius: 5,
          },
        }}
      >
      Responsáveis Atuais
      </Typography>
    </>
  );
}