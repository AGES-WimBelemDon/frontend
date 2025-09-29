import { useMemo, useState } from "react";

import { useActivities } from "../../hooks/useActivities";

export function useActivityList() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("all");
  const [frequency, setFrequency] = useState("all");

  const { isLoadingActivities, activitiesError, activities } = useActivities();

  const filteredActivities = useMemo(() => {
    if (isLoadingActivities || activitiesError || !activities) {
      return [];
    }
    return activities.filter((activity) => {
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
  }, [isLoadingActivities, activitiesError, activities, name, area, frequency]);

  return {
    name,
    setName,
    area,
    setArea,
    frequency,
    setFrequency,
    filteredActivities,
  };
}
