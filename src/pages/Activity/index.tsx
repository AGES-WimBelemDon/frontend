import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { ActivityCard } from "./ActivityCard";
import { ActivityFilter } from "./ActivityFilter";
import { useActivityList } from "./hook";
import { CardList } from "../../components/CardList";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { type Activity } from "../../services/activities";

export default function ActivityList() {
  const {
    isLoadingActivities,
    activitiesError,
    goTo,
    name,
    setName,
    area,
    setArea,
    frequency,
    setFrequency,
    filteredActivities,
  } = useActivityList();

  if (isLoadingActivities) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.activityList.loadingActivities}</Typography>
      </>
    );
  }

  if (activitiesError) {
    return <Typography color="error">{strings.activityList.activitiesError}</Typography>;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={strings.activityList.title} dataCy="activity-list" />
        <Button
          disabled
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => goTo("/atividades", "/cadastro")}
        >
          {strings.activityList.createNew}
        </Button>
      </Box>
      <ActivityFilter
        name={name} onNameChange={setName}
        area={area} onAreaChange={setArea}
        frequency={frequency} onFrequencyChange={setFrequency}
      />
      <br />
      <CardList>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity: Activity) => (
            <ActivityCard key={activity.id} content={activity} />
          ))
        ) : (
          <Typography>{strings.activityList.activitiesEmpty}</Typography>
        )}
      </CardList>
    </>
  );
}
