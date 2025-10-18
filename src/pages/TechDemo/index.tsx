import { Button, Grid, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { PageTitle } from "../../components/PageTitle";
import { PersonCard } from "../../components/PersonCard";
import { TextCard } from "../../components/TextCard";
import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";

export default function TechDemo() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { openModal } = useNewResponsibleModal();

  function showAPIInfo() {
    navigate("2?c2=4");
  }

  return (
    <>
      <PageTitle title={strings.techDemo.title} dataCy="tech-demo" />

      <hr />

      <Grid container spacing={2} marginBottom={2}>
        <PersonCard
          fullName="Leonardo M"
          registrationNumber="123.456.789-10"
          dateOfBirth="07/07/2004"
          relationship="Namorando"
          nis="123123"
          phoneNumber="51-987654321"
          email="leo@gmail.com"
          address="Av. Ipiranga, 6681 - Partenon"
          educationLevel=""
          employmentStatus=""
          gender=""
          race=""
          socialPrograms=""
          socialName=""
        />
      </Grid>

      <Grid container spacing={2}>
        <TextCard title={strings.techDemo.home} theme="dark" />
        <TextCard title={strings.techDemo.home} theme="light" />
      </Grid>

      <hr />
      <Button
        onClick={showAPIInfo}
        variant="contained"
        color="primary"
        data-cy="tech-demo-show-api-info-button"
      >
        <Typography variant="body1">{strings.techDemo.showAPIInfo}</Typography>
      </Button>

      <hr />

      <Grid container spacing={2} marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-success-button"
          onClick={() => showToast(strings.techDemo.buttons.testToast, "success")}
        >
          {strings.techDemo.buttons.openSuccessToast}
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-error-button"
          onClick={() => showToast(strings.techDemo.buttons.testCloseableToast, "error", true)}
        >
          {strings.techDemo.buttons.openErrorToast}
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-cy="tech-demo-show-toast-info-button"
          onClick={() => showToast(strings.techDemo.buttons.testCloseableToast, "info", true)}
        >
          {strings.techDemo.buttons.openInfoToast}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal()}
        >
          {strings.techDemo.buttons.openModal}
        </Button>
      </Grid>

      <NewResponsibleModal />
      
      <Outlet />
    </>
  );
}