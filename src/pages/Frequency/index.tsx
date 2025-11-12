import { CircularProgress, Typography } from "@mui/material";

import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { TextCard } from "../../components/TextCard";
import { strings } from "../../constants";
import { useAvailableClasses } from "../../hooks/useAvailableClasses";
import { useRoutes } from "../../hooks/useRoutes";

export default function Frequency() {
  const { goTo } = useRoutes();
  const { availableClasses, isLoadingAvailableClasses, availableClassesError } = useAvailableClasses();

  if (isLoadingAvailableClasses) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.frequency.loadingActivities}</Typography>
      </>
    );
  }

  if (availableClassesError) {
    const error = availableClassesError as unknown as { response?: { status?: number; data?: { message?: string } } };
    const status = error.response?.status;
    const errorData = error.response?.data;
    let errorMessage: string = strings.frequency.activitiesError;

    if (status === 400) {
      errorMessage = `Bad Request: ${errorData?.message || "Invalid request format"}`;
    } else if (status === 404) {
      errorMessage = "User with the specified ID was not found.";
    } else if (status === 500) {
      errorMessage = "An unexpected internal server error occurred.";
    }

    return <Typography color="error">{errorMessage}</Typography>;
  }

  const classes = availableClasses || [];

  return (
    <>
      <PageTitle title={strings.frequency.title} dataCy="frequency-page-title" />
      <CardList>
        {classes.map((classItem, index) => {
          const { classId, className, isGeral, activity, classState } = classItem;
          if(classState == "INATIVA") {return}
          const displayTitle = isGeral ? "Chamada Geral" : className;
          return (
            <TextCard
              key={classId ?? `geral-${index}`}
              title={displayTitle}
              theme={index === 0 ? "dark" : "light"}
              onClick={() => {
                if(classId == null) {
                  void goTo("/frequencias/chamada-geral")
                  return
                }
                void goTo("/frequencias/atividades", `/${activity.activityId}/turmas/${classId}/chamada`);
              }}
            />
          );
        })}
      </CardList>
    </>
  );
}
