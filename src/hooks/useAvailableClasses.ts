import { useQuery } from "@tanstack/react-query";

import { useAuth } from "./useAuth";
import { getAvailableClasses } from "../services/frequency";

export function useAvailableClasses() {
  const { user, isLoadingAuth } = useAuth();
  const userId = user?.uid ?? "mock-user-123";

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
