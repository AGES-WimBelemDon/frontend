import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { ActivityCard } from "../ActivityCard";
import type { Activity } from "./interface";
import { PageTitle } from "../../../components/PageTitle";
import { pt } from "../../../constants";
import { getActivities } from "../../../services/activities";
import { ActivityFilter } from "../ActivityFilter";

export default function ActivityList() {
  const [activityList, setActivityList] = useState<Activity[]>([]);

  useEffect(() => {
    getActivities().then(setActivityList);
  }, []);

  return (
    <main>
      <PageTitle title={pt.activityList.title} dataCy="activity-list" />
      <ActivityFilter />
      <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gap={3}>
        {activityList.length > 0 ? (
          activityList.map((activity: Activity) => (
            <ActivityCard key={activity.id} content={activity} />
          ))
        ) : (
          <p>Nenhuma atividade encontrada.</p>
        )}
      </Box>
    </main>
  );
}
