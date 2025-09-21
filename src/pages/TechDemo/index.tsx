import { Button, Grid, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

import { PageTitle } from "../../components/PageTitle";
import { TextCard } from "../../components/TextCard";
import { pt } from "../../constants";
import { useToast } from "../../hooks/useToast";

export default function TechDemo() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  function showAPIInfo() {
    navigate("2?c2=4");
  }

  return (
    <>
      <PageTitle title={pt.techDemo.title} dataCy="tech-demo" />

      <hr />

      <Grid container spacing={2}>
        <TextCard
          title="Home"
          theme="dark"
        />
        <TextCard
          title="Home"
          theme="light"
        />
      </Grid>

      <hr />
      <Button
        onClick={showAPIInfo}
        variant="contained"
        color="primary"
        data-cy="tech-demo-show-api-info-button"
      >
        <Typography variant="body1">{pt.techDemo.showAPIInfo}</Typography>
      </Button>

      <hr />
      
      <Grid container spacing={2} marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-success-button"
          onClick={() => showToast("Teste de Toast", "success")}
        >
          Abrir toast de SUCESSO!
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-error-button"
          onClick={() => showToast("Teste de Toast fechável", "error", true)}
        >
          Abrir toast de ERRO!
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-info-button"
          onClick={() => showToast("Teste de Toast fechável", "info", true)}
        >
          Abrir toast de INFO!
        </Button>
      </Grid>
      <Outlet />
    </>
  );
}
// import { Button, Container, Stack, Typography } from '@mui/material'; 
// import { Outlet, useNavigate } from 'react-router'; 
// import UserProfile from './Profile'; 
// import ButtonCard from '../../components/ButtonCard'; 
// import Header from '../../components/header'; 
// import { pt } from '../../constants'; 
// import ButtonCadastro from '../../components/ButtonCadastro';

// function TechDemo() { 
//   const navigate = useNavigate(); 
  
//   function showAPIInfo() { 
//     navigate('2?c2=4'); 
//   } 
  
//   return (
//      <Container>
//        <Header/>
//         <Container maxWidth="sm">
//            <Stack>
//              <Typography variant='h1' data-cy="tech-demo-title">{pt.techDemo.title}</Typography>
//               <Button
//                onClick={showAPIInfo}
//                 variant="contained"
//                  color="primary"
//                   data-cy="tech-demo-show-api-info-button" >
//                      <Typography variant='body1'>{pt.techDemo.showAPIInfo}
//     </Typography>
//      </Button>
//       </Stack>
//        <UserProfile />
//         <Outlet />
//          <ButtonCard initialName='Nome do aluno 1' frequency='teste de frequencia do aluno'></ButtonCard>
//          <ButtonCadastro frequency='Educando' initialName='Atividade'></ButtonCadastro>
//          </Container>
//            </Container>
//             );
//            }

//   export default TechDemo;
