import { Button, Grid, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { PageTitle } from "../../components/PageTitle";
import { PersonCard } from "../../components/PersonCard";
import { TextCard } from "../../components/TextCard";
import { pt } from "../../constants";
import { useToast } from "../../hooks/useToast";

export default function TechDemo() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {openModal} = useNewResponsibleModal();

  function showAPIInfo() {
    navigate("2?c2=4");
  }

  return (
    <>
      <PageTitle title={pt.techDemo.title} dataCy="tech-demo" />

      <hr />

      <Grid container spacing={2} marginBottom={2}>
        <PersonCard
          name="Leonardo M"
          cpf="123.456.789-10"
          birthDate="07/07/2004"
          civilState="Namorando"
          nis="123123"
          phone="51-987654321"
          email="leo@gmail.com"
          address="Av. Ipiranga, 6681 - Partenon"
        />
      </Grid>

      <Grid container spacing={2}>
        <TextCard title="Home" theme="dark" />
        <TextCard title="Home" theme="light" />
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal()}
        >
          Abrir modal
        </Button>
      </Grid>
      <NewResponsibleModal />
      <Outlet />
    </>
  );
}