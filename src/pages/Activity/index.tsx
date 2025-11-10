import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { ActivityCard } from "./ActivityCard";
import { ActivityFilter } from "./ActivityFilter";
import { useActivityPage } from "./hook";
import { CardList } from "../../components/CardList";
import { NewActivityModal } from "../../components/NewActivityModal";
import { useNewActivityModal } from "../../components/NewActivityModal/hook";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { type Activity } from "../../services/activities";

export default function ActivityList() {
  const {
    isLoadingActivities,
    activitiesError,
    isMobile,
    name,
    setName,
    filteredActivities,
  } = useActivityPage();

  const {
    isOpen,
    openModal,
    closeModal,
    handleSubmit,
  } = useNewActivityModal();

  if (isLoadingActivities) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.activityList.loadingActivities}</Typography>
      </>
    );
  }

  if (activitiesError) {
    return (
      <Typography color="error">
        {strings.activityList.activitiesError}
      </Typography>
    );
  }

  return (
    <>
      <PageTitle title={strings.activityList.title} dataCy="activity-list" />
      
      <Box gap={3} display="flex" flexDirection="column">
        <ActivityFilter name={name} onNameChange={setName} />
        
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={openModal}
          sx={{
            alignSelf: isMobile ? "auto" : "flex-start",
          }}
        >
          <Typography fontWeight="bold" variant="button">
            {strings.activityList.createNew}
          </Typography>
        </Button>

        <CardList rowGap={2}>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity: Activity) => (
              <ActivityCard key={activity.id} content={activity} />
            ))
          ) : (
            <Typography>{strings.activityList.activitiesEmpty}</Typography>
          )}
        </CardList>
      </Box>
      <NewActivityModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
