import { useEffect, useMemo, useState } from "react";

import { ActivityCard } from "../ActivityCard";
import type { Activity } from "./interface";
import { CardList } from "../../../components/CardList";
import { PageTitle } from "../../../components/PageTitle";
import { pt } from "../../../constants";
import { getActivities } from "../../../services/activities";
import { ActivityFilter } from "../ActivityFilter";

export default function ActivityList() {
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("all");
  const [frequency, setFrequency] = useState("all");

  useEffect(() => {
    getActivities().then(setActivityList);
  }, []);

  const filteredActivities = useMemo(() => {
    return activityList.filter((activity) => {
      const nameMatch =
        name === "" ||
        activity.name.toLowerCase().includes(name.toLowerCase());
      const areaMatch =
        area === "all" ||
        activity.area.toLowerCase() === area.toLowerCase();
      const frequencyMatch =
        frequency === "all" ||
        activity.frequency.toLowerCase() === frequency.toLowerCase();

      return nameMatch && areaMatch && frequencyMatch;
    });
  }, [activityList, name, area, frequency]);

  return (
    <>
      <PageTitle title={pt.activityList.title} dataCy="activity-list" />
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
          <p>Nenhuma atividade encontrada.</p>
        )}
      </CardList>
    </>
  );
}
