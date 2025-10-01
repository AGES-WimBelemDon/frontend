import { CircularProgress, Typography } from "@mui/material";

import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { TextCard } from "../../components/TextCard";
import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useRoutes } from "../../hooks/useRoutes";

export default function Frequency() {
  const { goTo } = useRoutes();
  const { activities, isLoadingActivities, activitiesError } = useActivities();

  if (isLoadingActivities) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.frequency.loadingActivities}</Typography>
      </>
    );
  }

  if (activitiesError || !activities) {
    return <Typography color="error">{strings.frequency.activitiesError}</Typography>;
  }

  return (
    <>
      <PageTitle title={strings.frequency.title} dataCy="frequency-page-title" />
      <CardList>
        {activities.map((c, index) => {
          const activityId = index + 1;
          return (
            <TextCard
              key={`${index}-${c.name}`}
              title={c.name}
              theme={index === 0 ? "dark" : "light"}
              onClick={() => goTo("/frequencias/atividades", `/${activityId}/turmas`)}
            />
          );}
        )}
      </CardList>
    </>
  );
}
