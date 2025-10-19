import { useQuery } from "@tanstack/react-query";

import { getAvailableClasses } from "../services/frequency";
import { useAuth } from "./useAuth";

export function useAvailableClasses() {
  const { user, isLoadingAuth } = useAuth();
  const userId = user?.uid;

  const { data, isPending, error } = useQuery({
    queryKey: ["available-classes", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      return getAvailableClasses(userId);
    },
    enabled: !isLoadingAuth && !!userId,
    retry: false,
  });

  return {
    availableClasses: data,
    isLoadingAvailableClasses: isPending,
    availableClassesError: error,
  };
}
