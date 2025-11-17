import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { useFrequencyClasses } from "./hook";
import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { TextCard } from "../../components/TextCard";
import { strings } from "../../constants";

export default function FrequencyClasses() {
  const {
    goTo,
    goBack,
    isLoadingClasses,
    classesError,
    classes,
    activityId,
    activityTitle,
  } = useFrequencyClasses();

  if (isLoadingClasses) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.frequencyClasses.loadingClasses}</Typography>
      </>
    );
  }

  if (classesError || !classes) {
    return <Typography color="error">{strings.frequencyClasses.classesError}</Typography>;
  }

  return (
    <>
      <PageTitle
        title={strings.frequencyClasses.title({ activity: activityTitle })}
        dataCy="frequency-classes"
      />
      <CardList>
        {
          classes.length === 0
            ? (
              <Box
                gap={2}
                display="flex"
                flexDirection="column"
              >
                <Typography>{strings.frequencyClasses.noClasses}</Typography>
                <Button variant="outlined" onClick={goBack}>
                  {strings.frequencyClasses.goBack}
                </Button>
              </Box>
            ) : classes.map((c, index) => {
              return (
                <TextCard
                  key={c.id}
                  title={c.name}
                  theme={index === 0 ? "dark" : "light"}
                  onClick={() => goTo("/frequencias/atividades", `/${activityId}/turmas/${c.id}/chamada`)}
                />
              );
            })
        }
      </CardList>
    </>
  );
}
