import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { useFrequencyClasses } from "./hook";
import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { TextCard } from "../../components/TextCard";
import { pt } from "../../constants";

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
        <Typography>{pt.frequencyClasses.loadingClasses}</Typography>
      </>
    );
  }

  if (classesError || !classes) {
    return <Typography color="error">{pt.frequencyClasses.classesError}</Typography>;
  }

  return (
    <>
      <PageTitle
        title={pt.frequencyClasses.title({ activity: activityTitle })}
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
                <Typography>{pt.frequencyClasses.noClasses}</Typography>
                <Button variant="outlined" onClick={goBack}>
                  {pt.frequencyClasses.goBack}
                </Button>
              </Box>
            ) : classes.map((c, index) => {
              return (
                <TextCard
                  key={c.id}
                  title={c.title}
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
