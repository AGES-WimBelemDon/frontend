import { useQuery } from "@tanstack/react-query";

import { useAuth } from "./useAuth";
import { getAvailableClasses } from "../services/frequency";

export function useAvailableClasses() {
  const { user, isLoadingAuth } = useAuth();
  const userId = user?.uid ?? "1";

  const { data, isPending, error } = useQuery({
    queryKey: ["available-classes", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const available = await getAvailableClasses(userId);
      available.sort((a,b) => {
        return a.classId - b.classId
      })
      return available
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
