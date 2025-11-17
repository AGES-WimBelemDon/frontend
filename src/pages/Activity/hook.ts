import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useScreenSize } from "../../hooks/useScreenSize";
import { getActivities } from "../../services/activities";

export function useActivityPage() {
  const { isMobile } = useScreenSize();

  const [name, setName] = useState("");
  
  const {
    isPending,
    error,
    data,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities
  })

  const filteredActivities = data?.filter(activity =>
    activity.name.toLowerCase().includes(name.toLowerCase())
  ) || [];

  return {
    isLoadingActivities: isPending,
    activitiesError: error,
    isMobile,
    name,
    setName,
    activities: data,
    filteredActivities,
  };
}
