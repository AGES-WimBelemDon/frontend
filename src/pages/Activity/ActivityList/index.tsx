import { useEffect, useState } from "react";

import { ActivityCard } from "../ActivityCard";
import type { Activity } from "./interface";
import { CardList } from "../../../components/CardList";
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
    <>
      <PageTitle title={pt.activityList.title} dataCy="activity-list" />
      <ActivityFilter />
      <br/>
      <CardList>
        {activityList.length > 0 ? (
          activityList.map((activity: Activity) => (
            <ActivityCard key={activity.id} content={activity} />
          ))
        ) : (
          <p>Nenhuma atividade encontrada.</p>
        )}
      </CardList>
    </>
  );
}
